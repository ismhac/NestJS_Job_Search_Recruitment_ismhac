import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage('create a new user success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For create a user' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @User() user: IUser) {
    let newUSer = await this.usersService.create(createUserDto, user);
    return {
      _id: newUSer?._id,
      createdAt: newUSer?.createdAt
    };
  }

  @Get()
  @ResponseMessage('get all user success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: "For get users" })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('get a user success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For get a user information' })
  async findOne(@User() user: IUser) {
    return await this.usersService.findOne(user);
  }

  @Patch(':id')
  @ResponseMessage('update a user success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: "For update a user" })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser) {
    return await this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage('remove a user success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: "For delete a user" })
  async remove(
    @Param('id') id: string,
    @User() user: IUser) {
    return await this.usersService.remove(id, user);
  }

  @Patch('/jobs/like-jobs/:jobId')
  @ResponseMessage('add like job success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For like a job' })
  async addToLikeJobs(
    @User() user: IUser,
    @Param('jobId') jobId: string) {
    let result = await this.usersService.addToLikeJobs(user, jobId);
    return result;
  }

  @Patch('/jobs/unlike-jobs/:jobId')
  @ResponseMessage('unlike job success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'for unlike a job' })
  async unLikeAJob(
    @User() user: IUser,
    @Param('jobId') jobId: string) {
    let result = await this.usersService.unLikeAJob(user, jobId);
    return result;
  }

  @Get("/jobs/apply-jobs")
  @ResponseMessage("get applied jobs successfully")
  @ApiBearerAuth('token')
  @ApiOperation({ summary: `For get user's applied jobs` })
  async getAllApplyJob(@User() user: IUser) {
    let result = await this.usersService.getAllApplyJob(user);
    return result;
  }


  @Public()
  @Get("reset-password/:email")
  @ResponseMessage("send reset password email successfully")
  @ApiOperation({ summary: 'For send reset password email' })
  async resetPassword(@Param('email') email: string) {
    let result = await this.usersService.requestPasswordReset(email);
    return result;
  }

  @Public()
  @Patch("/change-password/:resetPasswordToken")
  @ResponseMessage("change password success")
  @ApiOperation({ summary: 'For change password' })
  changePassword(@Param('resetPasswordToken') resetPasswordToken: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.changePassword(resetPasswordToken, updateUserPasswordDto);
  }
}



