import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }

  @Post()
  @ResponseMessage('Subscriber created successfully')
  create(@Body() createSubscriberDto: CreateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Get()
  @ResponseMessage('Subscribers fetched successfully')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage('Subscriber fetched successfully')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser
  ) {
    return this.subscribersService.update(id, updateSubscriberDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
