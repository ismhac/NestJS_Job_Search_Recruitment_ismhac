import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get() // route / => api (restful)
  @Render("home")
  getHello() {
    // return "this.appService.getHello()";
  }
}
