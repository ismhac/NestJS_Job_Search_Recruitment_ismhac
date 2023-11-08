import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('APIs for Managing User Information')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage('Create a new user success')
  // swagger
  @ApiOperation({ summary: 'API create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        name: {
          type: 'string',
          example: 'Nguyen Van A'
        },
        email: {
          type: 'string',
          example: 'useremail@gmail.com'
        },
        password: {
          type: 'string',
          example: '123456'
        },
        avatar: {
          type: 'string',
          example: "image_file_path"
        },
        age: {
          type: 'number',
          example: 20
        },
        address: {
          type: 'string',
          example: 'Ha Noi'
        },
        role: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        },
        company: {
          type: 'object',
          example: {
            _id: '60f6f8e2a0a3a11b2c1b2f8d',
            name: 'ABC Company'
          }
        }
      }
    }
  })
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
  @Patch(':id')
  @ResponseMessage('Update a user success')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser) {
    return await this.usersService.update(id, updateUserDto, user);
  }


  @Delete(':id')
  @ResponseMessage('Remove a user success')
  async remove(
    @Param('id') id: string,
    @User() user: IUser) {
    return await this.usersService.remove(id, user);
  }
}
