import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import { UserRegisterTempDocument, UsersRegisterTemp } from './schema/user_register_temp.schema';
import { CreateUsersRegisterTempDto } from './dto/create-user_register_temp.dto';

@Injectable()
export class UsersRegisterTempsService {

  constructor(
    @InjectModel(UsersRegisterTemp.name)
    private userRegisterTempModule: SoftDeleteModel<UserRegisterTempDocument>,


    private mailerService: MailerService,
  ) { }

  async senEmailRegister(createUsersRegisterTempDto: CreateUsersRegisterTempDto) {
    const { email, password, name, age, gender, address, company } = createUsersRegisterTempDto;

    const newTempUser: UserRegisterTempDocument = await this.userRegisterTempModule.create({
      email: email,
      password: password,
      name: name,
      age: age,
      address: company
    })


    const OTP = crypto.randomBytes(20).toString('hex');
    newTempUser.registerToken = OTP;
    newTempUser.registerTokenExpires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 1 day
    await newTempUser.save();

    const confirmRegisterLink = `https://job-app-ivory.vercel.app/register/confirm/madida`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@itjobs.com>',
      subject: 'Reset your password',
      template: 'registerMail',
      context: {
        email: newTempUser.email,
        link: confirmRegisterLink,
        otp: OTP
      }
    });
    return newTempUser;
  }
}
