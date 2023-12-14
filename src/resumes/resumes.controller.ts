import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateUserCvDto } from './dto/create-resume.dto';
import { ResumesService } from './resumes.service';

@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post('by-user')
  @ResponseMessage('get resumes successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: `For get user's resumes` })
  getResumesByUser(@User() user: IUser) {
    return this.resumesService.findByUsers(user);
  }

  @Post()
  @ResponseMessage('create a resume successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For create a new resume' })
  create(@Body() createUserCv: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createUserCv, user);
  }

  @Get()
  @ResponseMessage('get resumes successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For get resumes' })
  @ApiQuery({ name: 'current', required: false, type: Number, description: 'Current page', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Page size', example: 10 })
  @ApiQuery({
    type: 'string', name: 'filter', required: false, description: 'Filter',
    example: `{"userId": "60f6f8e2a0a3a11b2c1b2f8d", "jobId": "60f6f8e2a0a3a11b2c1b2f8d", "companyId": "60f6f8e2a0a3a11b2c1b2f8d", "status": "PENDING"}`,
  })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.resumesService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('get a resume successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For get a resume' })
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('update a resume successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For update a resume' })
  update(@Param('id') id: string, @Body("status") status: string, @User() user: IUser) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage('delete resume success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For delete a resume' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
