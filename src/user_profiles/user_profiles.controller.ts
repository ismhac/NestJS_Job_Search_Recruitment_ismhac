import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfilesService } from './user_profiles.service';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) { }

  @Post(":resumeId")
  @ResponseMessage('Create a new user profile success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API create a new user profile' })
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        skills: {
          type: 'array',
          items: {
            type: 'string'
          },
          example: ['NodeJS', 'ReactJS']
        },
        level: {
          type: 'string',
          example: 'FRESHER'
        },
        isPublic: {
          type: 'boolean',
          default: false,
          example: true
        }
      }
    }
  })
  async create(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @User() user: IUser,
    @Param("resumeId") resumeId: String,
  ) {
    return await this.userProfilesService.create(createUserProfileDto, user, resumeId);
  }

  // @Get()
  // findAll() {
  //   return this.userProfilesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userProfilesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
  //   return this.userProfilesService.update(+id, updateUserProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userProfilesService.remove(+id);
  // }
}
