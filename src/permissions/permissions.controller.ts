import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @ResponseMessage('Permission created successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API create a new permission' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'apiPath', 'method', 'module'],
      properties: {
        name: {
          type: 'string',
          example: 'create new module'
        },
        apiPath: {
          type: 'string',
          example: 'api/v1/new-module'
        },
        method: {
          type: 'string',
          example: 'POST'
        },
        module: {
          type: 'string',
          example: 'NEWMODULE'
        }
      }
    }
  })
  create(@Body() createPermissionDto: CreatePermissionDto, @User() user: IUser) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @ResponseMessage('Permissions fetched successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API get all permissions' })
  @ApiQuery({ name: 'current', required: false, type: Number, description: 'Current page', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Page size', example: 10 })
  @ApiQuery({
    type: 'string', name: 'filter', required: false, description: 'Filter',
    example: `{"name":"/Get Company with paginate/i","method":"/GET/i","module":"/COMPANIES/i"}`,
  })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.permissionsService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('Permission fetched successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API get a permission by id' })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Permission updated successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API update a permission by id' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'apiPath', 'method', 'module'],
      properties: {
        name: {
          type: 'string',
          example: 'create new module'
        },
        apiPath: {
          type: 'string',
          example: 'api/v1/new-module'
        },
        method: {
          type: 'string',
          example: 'POST'
        },
        module: {
          type: 'string',
          example: 'NEWMODULE'
        }
      }
    }
  })
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user: IUser) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Permission deleted successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API delete a permission by id' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  }
}
