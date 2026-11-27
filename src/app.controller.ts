import { Controller, Delete, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }
  @Get("weather")
  getWeather() {
    return this.appService.weather();
  }

  @Get("weather/:id")
  getSingleWeather(@Param('id') id: string) {
    return this.appService.getSingleWeather(Number(id));
  };

  @Delete("weather/:id")
  deleteWeather(@Param('id') id: string) {
    return this.appService.deleteSingleWeather(Number(id));
  };

}
