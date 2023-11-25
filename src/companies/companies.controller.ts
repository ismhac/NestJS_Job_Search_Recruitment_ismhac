import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @ResponseMessage('Create a new company successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }


  @Public()
  @Get()
  @ResponseMessage('Get all companies successfully')
  // swagger
  @ApiOperation({ summary: 'API get all companies' })
  @ApiQuery({ name: 'current', required: false, type: Number, description: 'Current page', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Page size', example: 10 })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Search for companies by name', example: '/Facebook/i' })
  @ApiQuery({ name: 'address', required: false, type: String, description: 'Search for companies by address', example: '/USA/i' })
  findAll(
    @Query('current') currentPage: string, // const currentPage: string = req.query.page
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.companiesService.findAll(+currentPage, +limit, queryString);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get a company successfully')
  // swagger
  @ApiOperation({ summary: 'API get a company by id' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a company successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API update a company by id' })
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        name: {
          type: 'string',
          example: 'Facebook',
        },
        address: {
          type: 'string',
          example: 'USA',
        },
        description: {
          type: 'string',
          example: 'Facebook is a social networking site that makes it easy for you to connect and share with family and friends online.',
        },
        logo: {
          type: 'string',
          example: 'https://www.facebook.com/images/fb_icon_325x325.png',
        }
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Remove a company successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API remove a company by id' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
