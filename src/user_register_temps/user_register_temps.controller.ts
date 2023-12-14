import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUsersRegisterTempDto } from './dto/create-user_register_temp.dto';
import { UpdateUserRegisterTempDto } from './dto/update-user_register_temp.dto';
import { Public } from 'src/decorator/customize';
import { UsersRegisterTempsService } from './user_register_temps.service';

@Controller('users-register-temps')
export class UsersRegisterTempsController {
  constructor(private readonly usersRegisterTempsService: UsersRegisterTempsService) { }
  @Public()
  @Post("/send-email-register")
  sendEmailRegisterUSer(
    @Body() createUsersRegisterTempDto: CreateUsersRegisterTempDto) {
    let result = this.usersRegisterTempsService.senEmailRegister(createUsersRegisterTempDto);
    return result;
  }
}
