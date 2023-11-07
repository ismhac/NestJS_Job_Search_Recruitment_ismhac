import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
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


  // @Public()
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
