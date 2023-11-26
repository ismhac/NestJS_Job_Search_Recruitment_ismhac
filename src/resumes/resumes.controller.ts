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
  @ResponseMessage('get all resume by user success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API get all resume by user' })
  getResumesByUser(@User() user: IUser) {
    return this.resumesService.findByUsers(user);
  }

  @Post()
  @ResponseMessage('create resume success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API create a new resume' })
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        email: {
          type: 'string',
          example: 'useremail@gmail.com'
        },
        userId: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        },
        url: {
          type: 'string',
          example: 'https://www.topcv.vn/xem-cv/5f6f8e2a0a3a11b2c1b2f8d'
        },
        status: {
          type: 'string',
          example: 'PENDING'
        },
        companyId: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        },
        jobId: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        }
      }
    }
  })
  create(@Body() createUserCv: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createUserCv, user);
  }

  @Get()
  @ResponseMessage('get all resume success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API get all resume' })
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
  @ResponseMessage('get resume success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API get a resume by id' })
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('update resume success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API update a resume by id' })
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        email: {
          type: 'string',
          example: 'useremail@gmail.com'
        },
        userId: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        },
        url: {
          type: 'string',
          example: 'https://www.topcv.vn/xem-cv/5f6f8e2a0a3a11b2c1b2f8d'
        },
        status: {
          type: 'string',
          example: 'PENDING'
        },
        companyId: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        },
        jobId: {
          type: 'string',
          example: '60f6f8e2a0a3a11b2c1b2f8d'
        }
      }
    }
  })
  update(@Param('id') id: string, @Body("status") status: string, @User() user: IUser) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage('delete resume success')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API delete a resume by id' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
