import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';

@ApiTags('APIs for Managing Job Information')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @ResponseMessage('Create a new job successfully')
  // swagger
  @ApiOperation({ summary: 'API create a new job' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'skills', 'company', 'location', 'salary', 'quantity', 'level', 'description', 'startDate', 'endDate', 'isActive'],
      properties: {
        name: {
          type: 'string',
          example: 'NodeJS Developer',
        },
        skills: {
          type: 'array',
          items: {
            type: 'string'
          },
          example: ['NodeJS', 'ReactJS']
        },
        company: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60a8a8f1b6a0a72b3c8f0d5f'
            },
            name: {
              type: 'string',
              example: 'NestJS'
            },
            logo: {
              type: 'string',
              example: 'https://nestjs.com/img/logo_text.svg'
            }
          },
        },
        location: {
          type: 'string',
          example: 'Ho Chi Minh'
        },
        salary: {
          type: 'number',
          example: 1000
        },
        quantity: {
          type: 'number',
          example: 10
        },
        level: {
          type: 'string',
          example: 'Senior'
        },
        description: {
          type: 'string',
          example: 'NodeJS Developer'
        },
        startDate: {
          type: 'Date',
          example: '2021-05-23T00:00:00.000Z'
        },
        endDate: {
          type: 'Date',
          example: '2021-05-23T00:00:00.000Z'
        },
        isActive: {
          type: 'boolean',
          example: true
        }
      },
    },
  })
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Public()
  @Get()
  @ResponseMessage('Get all jobs successfully')
  // swagger
  @ApiOperation({ summary: 'API get all jobs' })
  @ApiQuery({ name: 'current', required: false, type: Number, description: 'Current page', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Page size', example: 10 })
  @ApiQuery({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: '',
          example: '/NodeJS Developer/i',
        },
        location: {
          type: 'string',
          example: '/Hà Nội/i'
        },
        level: {
          type: 'string',
          example: '/Senior/i'
        },
        salary: {
          type: 'object',
          example: {
            "$gte": 5000000,
            "$lte": 10000000
          }
        },
        quantity: {
          type: 'number',
          example: 10
        },
        skills: {
          type: 'object',
          example: {
            "$in": ["NodeJs", "ReactJs", "Java"]
          }
        }
      }
    },
    name: 'filter',
    required: false,
    description: 'Filter object'
  })
  findAll(
    @Query('current') currentPage: string, // const currentPage: string = req.query.page
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.jobsService.findAll(+currentPage, +limit, queryString);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get a job successfully')
  // swagger
  @ApiOperation({ summary: 'API get a job by id' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a job successfully')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Remove a job successfully')
  remove(
    @Param('id') id: string,
    @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
