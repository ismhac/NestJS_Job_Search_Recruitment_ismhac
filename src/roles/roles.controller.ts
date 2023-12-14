import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ResponseMessage('create a role successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For create a new role' })
  create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage('get roles successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For get roles' })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.rolesService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('get a role successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For get a role' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('update a role successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For update a role' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @ResponseMessage('delete a role successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'For delete a role' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.rolesService.remove(id, user);
  }
}
