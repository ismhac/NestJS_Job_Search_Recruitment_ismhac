import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage('Create a new user success')
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
  @ResponseMessage('Get all user success')
  findAll(
    @Query('current') currentPage: string, // const currentPage: string = req.query.page
    @Query('pageSize') limit: string,      // const limit: string = req.query.limit
    @Query() queryString: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, queryString);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get a user success')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }


  @Patch()
  @ResponseMessage('Update a user success')
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return await this.usersService.update(updateUserDto, user);
  }


  @Delete(':id')
  @ResponseMessage('Remove a user success')
  async remove(
    @Param('id') id: string,
    @User() user: IUser) {
    return await this.usersService.remove(id, user);
  }
}
