import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import { UserRegisterTempDocument, UsersRegisterTemp } from './schema/user_register_temp.schema';
import { CreateUsersRegisterTempDto } from './dto/create-user_register_temp.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { ErrorConstants } from 'src/utils/ErrorConstants';
import { UsersService } from 'src/users/users.service';
import { RegisterRecruiterDto, RegisterUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersRegisterTempsService {

  constructor(
    @InjectModel(UsersRegisterTemp.name)
    private userRegisterTempModel: SoftDeleteModel<UserRegisterTempDocument>,

    private mailerService: MailerService,

    private userService: UsersService,

    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>
  ) { }

  async senEmailRegister(createUsersRegisterTempDto: CreateUsersRegisterTempDto) {
    const { email, password, name, age, gender, address, company } = createUsersRegisterTempDto;
    const newTempUser = await this.userRegisterTempModel.create({
      email: email,
      password: password,
      name: name,
      age: age,
      gender: gender,
      address: address,
      company: company
    })

    // check duplicated email
    let isExistUser = await this.userModel.findOne({ email: email });
    if (isExistUser) {
      console.log(isExistUser);
      throw new BadRequestException(ErrorConstants.USER_IS_EXIST(email))
    }

    const OTP = crypto.randomBytes(20).toString('hex');
    newTempUser.registerToken = OTP;
    newTempUser.registerTokenExpires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 1 day

    try {
      await newTempUser.save();
    } catch (error) {
      console.error(error);
    }

    const confirmRegisterLink = `https://job-app-ivory.vercel.app/register/confirm/madida`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@itjobs.com>',
      subject: 'Register New Account',
      template: 'registerMail',
      context: {
        email: newTempUser.email,
        link: confirmRegisterLink,
        otp: OTP
      }
    });
    return newTempUser;
  }




  async handleRegister(otp: string) {
    let userTemp = (await this.userRegisterTempModel.findOne({ registerToken: otp })).toObject();
    if (!userTemp) {
      throw new BadRequestException(ErrorConstants.NOT_FOUND_USER_TEMP_REGISTER(otp));
    }
    if (userTemp && userTemp.company) {
      let temp: RegisterRecruiterDto = new RegisterRecruiterDto();
      temp.email = userTemp.email;
      temp.name = userTemp.name;
      temp.password = userTemp.password;
      temp.age = userTemp.age;
      temp.address = userTemp.address;
      temp.gender = userTemp.gender;
      temp.company = userTemp.company;

      let newRecruiter = await this.userService.recruiterRegister(temp);
      if (newRecruiter) {
        await this.userRegisterTempModel.updateOne(
          { _id: userTemp._id },
          {
            deletedBy: {
              _id: userTemp._id,
              email: userTemp.email
            }
          }
        );
        await this.userRegisterTempModel.softDelete({ _id: userTemp._id })
      }
      return newRecruiter;
    } else {
      let temp: RegisterUserDto = new RegisterUserDto();
      temp.email = userTemp.email;
      temp.name = userTemp.name;
      temp.password = userTemp.password;
      temp.age = userTemp.age;
      temp.address = userTemp.address;
      temp.gender = userTemp.gender;

      let newUSer = await this.userService.userRegister(temp);
      if (newUSer) {
        await this.userRegisterTempModel.updateOne(
          { _id: userTemp._id },
          {
            deletedBy: {
              _id: userTemp._id,
              email: userTemp.email
            }
          }
        );
        await this.userRegisterTempModel.softDelete({ _id: userTemp._id })
      }
      return newUSer;
    }
  }


}
