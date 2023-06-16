import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createResponse } from './helper/response.helper';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return createResponse(await this.appService.getHello());
  }
}
