import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscribersService } from './subscribers.service';

@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }

  @Post()
  @ResponseMessage('Subscriber created successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API create a new subscriber' })
  create(@Body() createSubscriberDto: CreateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post('skills')
  @ResponseMessage(`Get subscriber's skills`)
  @SkipCheckPermission()
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: `API get subscriber's skills` })
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }


  @Get()
  @ResponseMessage('Subscribers fetched successfully')
  // swagger
  @ApiOperation({ summary: 'API get all subscribers' })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('Subscriber fetched successfully')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API get a subscriber by id' })
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @SkipCheckPermission()
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API update a subscriber by id' })
  update(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  // swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API delete a subscriber by id' })
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
