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
  @ResponseMessage('create a new company successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }


  @Public()
  @Get()
  @ResponseMessage('get companies successfully')
  // swagger
  @ApiOperation({ summary: 'For get companies' })
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
  @ResponseMessage('get a company successfully')
  @ApiOperation({ summary: 'For get a company' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('update a company successfully')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For update a company' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @ResponseMessage('delete a company successfully')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For delete a company' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
