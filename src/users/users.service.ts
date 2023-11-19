import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose/dist/soft-delete-model';
import { ROLE_HR, ROLE_USER } from 'src/databases/sample';
import { User as UserDecorator } from 'src/decorator/customize';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { CreateUserDto, RegisterRecruiterDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User as UserModel } from './schemas/user.schema';
import { IUser } from './users.interface';
import { Company, CompanyDocument } from 'src/companies/schemas/company.schema';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { MailerService } from '@nestjs-modules/mailer';


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

    private mailerService: MailerService,
  ) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async findUsersById(id: String) {
    return await this.userModel.findById(id);
  }


  requestPasswordReset = async (email) => {

    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) throw new Error(`Email ${email} does not exist`);

    const resetPasswordLink = `hhhh`;
    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@itjobs.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'resetPass',
      context: {
        name: existingUser.name,
        link: resetPasswordLink,
      }
    })
    return "OK";
  };

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

  async addPreferJob(userId: string, jobId: string) {
    let existingJobs = await this.JobModule.findById({ _id: jobId });
    let existingUser = await this.userModel.findById({ _id: userId });
    if (!existingJobs) {
      throw new BadRequestException(`Job: ${jobId} does not exist in the system. Please use another job!`)
    }
    if (!existingUser) {
      throw new BadRequestException(`User: ${userId} does not exist in the system. Please use another user!`)
    }

    let updatedJob = await this.JobModule.updateOne(
      { _id: jobId },
      {
        $addToSet: {
          preferredUsers: {
            _id: userId,
            name: existingUser.name,
            email: existingUser.email
          }
        },
        updatedBy: {
          _id: existingUser._id,
          email: existingUser.email
        }
      }
    )
    let updatedUser = await this.userModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          preferJobs: {
            _id: jobId,
            name: existingJobs.name
          }
        },
        updatedBy: {
          _id: existingUser._id,
          email: existingUser.email
        }
      }
    )
    return {
      addPreferredUsers: updatedJob,
      addPreferJobs: updatedUser
    }
  }

  async unPreferJob(userId: string, jobId: string) {
    let existingJobs = await this.JobModule.findById({ _id: jobId });
    let existingUser = await this.userModel.findById({ _id: userId });
    if (!existingJobs) {
      throw new BadRequestException(`Job: ${jobId} does not exist in the system. Please use another job!`)
    }
    if (!existingUser) {
      throw new BadRequestException(`User: ${userId} does not exist in the system. Please use another user!`)
    }

    let updatedJob = await this.JobModule.updateOne(
      { _id: jobId },
      {
        $pull: {
          preferredUsers: { _id: userId }
        },
        updatedBy: {
          _id: existingUser._id,
          email: existingUser.email
        }
      }
    )
    let updatedUser = await this.userModel.updateOne(
      { _id: userId },
      {
        $pull: {
          preferJobs: { _id: jobId }
        },
        updatedBy: {
          _id: existingUser._id,
          email: existingUser.email
        }
      }
    )
    return {
      removePreferredUsers: updatedJob,
      removePreferJobs: updatedUser
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

    newRecruiter.company = {
      _id: newCompany._id as any,
      name: newCompany.name
    };

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

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }

    return await this.userModel.findOne({
      _id: id
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
