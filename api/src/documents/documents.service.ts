import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private repo: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    const data = await this.repo.find();
    return data;
  }

  async findAll() {
    const data = await this.repo.find({
      relations: {
        file: true,
      },
      order: {
        kode: 'ASC',
      },
    });
    return data;
  }
}
