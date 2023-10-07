import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateUserCvDto } from './dto/create-resume.dto';
import { ResumesService } from './resumes.service';

@ApiTags('Resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post('by-user')
  @ResponseMessage('get all resume by user success')
  getResumesByUser(@User() user: IUser) {
    return this.resumesService.findByUsers(user);
  }


  @Post()
  @ResponseMessage('create resume success')
  create(@Body() createUserCv: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createUserCv, user);
  }

  @Get()
  @ResponseMessage('get all resume success')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.resumesService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('get resume success')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('update resume success')
  update(@Param('id') id: string, @Body("status") status: string, @User() user: IUser) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
