import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose/dist/soft-delete-model';
import { ROLE_HR, ROLE_USER } from 'src/databases/sample';
import { User as UserDecorator } from 'src/decorator/customize';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { CreateUserDto, RegisterRecruiterDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { UserDocument, User as UserModel } from './schemas/user.schema';
import { IUser } from './users.interface';
import { Company, CompanyDocument } from 'src/companies/schemas/company.schema';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { Resume, ResumeDocument } from 'src/resumes/schemas/resume.schema';
import * as crypto from 'crypto';
import { ErrorConstants } from 'src/utils/ErrorConstants';
import { Exception } from 'handlebars/runtime';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UserModel.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Role.name)
    private roleModule: SoftDeleteModel<RoleDocument>,

    @InjectModel(Company.name)
    private companyModule: SoftDeleteModel<CompanyDocument>,

    @InjectModel(Job.name)
    private JobModule: SoftDeleteModel<JobDocument>,

    @InjectModel(Resume.name)
    private ResumeModule: SoftDeleteModel<ResumeDocument>,

    private mailerService: MailerService,
  ) { }

  private readonly logger = new Logger(UsersService.name);

  async changePassword(resetPasswordToken: string, updateUserPasswordDto: UpdateUserPasswordDto) {
    const userRequestChangePass = await this.userModel.findOne({ resetPasswordToken: resetPasswordToken });

    // Check if resetPasswordToken is valid
    if (!userRequestChangePass) {
      throw new BadRequestException(`Invalid token`);
    }

    // Check if resetPasswordToken has expired
    if (Date.now() > userRequestChangePass.resetPasswordExpires.getTime()) {
      throw new BadRequestException(`token has expired`);
    }

    const { inputNewPassWord, confirmNewPassWord } = updateUserPasswordDto;
    if (inputNewPassWord !== confirmNewPassWord) {
      throw new BadRequestException(`New password and confirm password are not matched`);
    }

    const hashPassword = this.getHashPassword(inputNewPassWord);
    const userUpdatePass = await this.userModel.updateOne(
      { _id: userRequestChangePass._id },
      {
        password: hashPassword,
      }
    );

    return userUpdatePass;
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async findUsersById(id: String) {
    return await this.userModel.findById(id);
  }

  async getAllApplyJob(user: IUser) {
    const resumes = await this.ResumeModule.find(
      {
        $and: [
          { user: user._id },
        ]
      }

    ).select({
      "_id": 1,
      "job": 1,
      "status": 1,
      "file": 1,
    }).populate({
      path: "job",
      select: {
        "name": 1,
        "company": 1,
        "location": 1,
        "salary": 1,
        "quantity": 1,
        "level": 1,
        "startDate": 1,
        "endDate": 1,
        "isActive": 1
      }
    });

    const customizedResumes = resumes.map(resume => ({
      resumeInfo: {
        _id: resume._id,
        file: resume.file,
        status: resume.status,
      },
      jobInfo: resume.job
    }));

    return customizedResumes;
  }

  async requestPasswordReset(email) {
    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) throw new BadRequestException(`Email ${email} does not exist`);

    const resetToken = crypto.randomBytes(20).toString('hex');
    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = new Date(Date.now() + 60 * 10 * 1000); // 10 minutes
    await existingUser.save();

    const resetPasswordLink = `https://job-app-ivory.vercel.app/forget-password-confirmation/${resetToken}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@itjobs.com>',
      subject: 'Reset your password',
      template: 'resetPass',
      context: {
        name: existingUser.name,
        link: resetPasswordLink,
      }
    });

    return {
      email: existingUser.email,
      resetPasswordLink
    }
  }

  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne(
      { refreshToken }
    ).populate({
      path: "role",
      select: { name: 1 }
    });
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne(
      { _id },
      { refreshToken }
    )
  }

  async addToLikeJobs(user: IUser, jobId: string) {
    try {
      let isExistJob = await this.JobModule.exists({ _id: jobId });
      if (!isExistJob) {
        throw new BadRequestException(ErrorConstants.NOT_FOUND_JOB_ID(jobId));
      }

      let updatedUser = await this.userModel.updateOne(
        { _id: user._id },
        {
          $addToSet: {
            likeJobs: jobId
          },
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      );

      let updateJob = await this.JobModule.updateOne(
        { _id: jobId },
        {
          $addToSet: {
            likedUsers: user._id
          },
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      );

      return { updatedUser, updateJob }

    } catch (error) {
      throw Exception;
    }
  }

  async unLikeAJob(user: IUser, jobId: string) {
    try {
      let existingJobs = await this.JobModule.findById({ _id: jobId });
      if (!existingJobs) {
        throw new BadRequestException(ErrorConstants.NOT_FOUND_JOB_ID(jobId))
      }
      let updatedJob = await this.JobModule.updateOne(
        { _id: jobId },
        {
          $pull: {
            likedUsers: user._id
          },
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      )
      let updatedUser = await this.userModel.updateOne(
        { _id: user._id },
        {
          $pull: {
            likeJobs: jobId
          },
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      )
      return { updatedUser, updatedJob }
    } catch (error) {
      throw Exception
    }
  }


  // name , email , password, age, gender, address
  async userRegister(user: RegisterUserDto) {
    const { name, email, password, age, gender, address, preferJobs } = user;
    // check email
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email: ${email} already exists in the system. Please use another email!`)
    }

    // fetch user role
    const userRole = await this.roleModule.findOne({ name: ROLE_USER });

    const hashPassword = this.getHashPassword(password);
    let newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id,
      preferJobs
    })
    return newRegister;
  }


  async recruiterRegister(user: RegisterRecruiterDto) {
    const { name, email, password, age,
      gender, address, company } = user;

    // check email
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email: ${email} already exists in the system. Please use another email!`)
    }

    // fetch user role
    const userRole = await this.roleModule.findOne({ name: ROLE_HR });

    const hashPassword = this.getHashPassword(password);

    // 
    const companyName = company?.name;
    const companyAddress = company?.address;
    const companyDescription = company?.description;
    const companyLogo = company?.logo;

    let newRecruiter = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id
    })

    let newCompany = await this.companyModule.create({
      name: companyName,
      address: companyAddress,
      description: companyDescription,
      logo: companyLogo,
      createdBy: {
        _id: newRecruiter?._id,
        email: email
      }
    })

    newRecruiter.company = newCompany._id as any;

    await newRecruiter.save();

    return {
      newRecruiter,
      newCompany
    };
  }



  async create(createUserDto: CreateUserDto, @UserDecorator() user: IUser) {

    const { name, email, password, age,
      gender, address, role, company, avatar } = createUserDto;
    // check email
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email: ${email} already exists in the system. Please use another email!`)
    }
    const hashPassword = this.getHashPassword(password)
    let newUser = await this.userModel.create({
      name, email,
      password: hashPassword,
      age, gender, address, role, company,
      avatar: avatar ? avatar : "",
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return newUser;
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, sort, population } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;
    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel.find(filter)
      .select('-password') // exclude password
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }

  async findOne(user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return 'not found user';
    }

    return await this.userModel.findOne({
      _id: user._id
    })
      .select('-password') // exclude
      .populate({ path: "role", select: { name: 1, _id: 1, } })
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    }).populate({
      path: "role", select: { name: 1 }
    })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    );
  }

  async remove(id: string, user: IUser) {
    // can not delete admin account: admin@gmail.com
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found user'
    }

    const foundUser = await this.userModel.findById(id);
    if (foundUser && foundUser.email === "admin@gmail.com") {
      throw new BadRequestException('Can not delete admin account');
    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return this.userModel.softDelete({ _id: id })
  }
}
