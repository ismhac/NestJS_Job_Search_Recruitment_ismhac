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
  // swagger
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
    @Query('current') currentPage: string, // const currentPage: string = req.query.page
    @Query('pageSize') limit: string,      // const limit: string = req.query.limit
    @Query() queryString: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, queryString);
  }

  // @Public()
  @Get(':id')
  @ResponseMessage('get a user success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For get a user information' })
  async findOne(@User() user: IUser) {
    return await this.usersService.findOne(user);
  }


  // @Public()
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

  // custom api
  // @Public()
  @Patch('/jobs/like-jobs/:jobId')
  @ResponseMessage('add like job success')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For like a job' })
  async addPreferJob(
    @User() user: IUser,
    @Param('jobId') jobId: string) {
    let result = await this.usersService.addPreferJob(user, jobId);
    return result;
  }

  // @Public()
  @Patch('/jobs/unlike-jobs/:jobId')
  @ResponseMessage('unlike job success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'for unlike a job' })
  async unPreferJob(
    @User() user: IUser,
    @Param('jobId') jobId: string) {
    let result = await this.usersService.unPreferJob(user, jobId);
    return result;
  }

  @Public()
  @Get("reset-password/:email")
  @ResponseMessage("send reset password email successfully")
  // swagger
  @ApiOperation({ summary: 'For send reset password email' })
  async resetPassword(@Param('email') email: string) {
    let result = await this.usersService.requestPasswordReset(email);
    return result;
  }

  @Get("/jobs/prefer-jobs")
  @ResponseMessage("get prefer jobs successfully")
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: `For get user's prefer jobs` })
  async getAllPreferJob(@User() user: IUser) {
    let result = await this.usersService.getAllPreferJob(user);
    return result;
  }

  @Get("/jobs/apply-jobs")
  @ResponseMessage("get applied jobs successfully")
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: `For get user's applied jobs` })
  async getAllApplyJob(@User() user: IUser) {
    let result = await this.usersService.getAllApplyJob(user);
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



