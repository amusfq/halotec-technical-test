import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { ErrorResponse } from 'src/helper/response.helper';

@Injectable()
export class HistoriesService {
  constructor(@InjectRepository(History) private repo: Repository<History>) {}

  async create(createHistoryDto: CreateHistoryDto) {
    if (!createHistoryDto.notes)
      throw new ErrorResponse({
        code: 500,
        message: 'Catatan tidak boleh kosong',
      });

    const lastType = await this.repo.find({
      order: {
        timeCreated: 'DESC',
      },
    });

    const history = new History();
    history.type = lastType.length > 0 ? lastType[0].type + 1 : 0;
    history.notes = createHistoryDto.notes;
    const saved = await this.repo.save(history);

    if (!saved)
      throw new ErrorResponse({
        code: 500,
        message: 'Gagal menyimpan history',
      });

    return saved;
  }

  findAll() {
    return this.repo.find({
      order: {
        timeCreated: 'DESC',
      },
    });
  }
}
