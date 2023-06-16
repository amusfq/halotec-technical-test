import { Controller, Get, Post, Body } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { createResponse } from 'src/helper/response.helper';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  async create(@Body() createHistoryDto: CreateHistoryDto) {
    return createResponse(await this.historiesService.create(createHistoryDto));
  }

  @Get()
  async findAll() {
    return createResponse(await this.historiesService.findAll());
  }
}
