import { Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { ErrorResponse } from 'src/helper/response.helper';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from 'src/documents/entities/document.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private repo: Repository<File>,
    @InjectRepository(Document)
    private repoDocument: Repository<Document>,
  ) {}

  async create(id: number, file: Express.Multer.File) {
    if (!file)
      throw new ErrorResponse({
        code: 500,
        message: 'Dokumen tidak boleh kosong',
      });
    if (file.size > 2e6)
      throw new ErrorResponse({
        code: 500,
        message: 'Ukuran file maksimal 2MB',
      });
    if (file.mimetype !== 'application/pdf')
      throw new ErrorResponse({
        code: 500,
        message: 'File yang didukung hanya PDF',
      });

    const document = await this.repoDocument.findOne({
      where: {
        id,
      },
      relations: { file: true },
    });
    if (!document)
      throw new ErrorResponse({
        code: 404,
        message: `Dokumen dengan id ${id} tidak ditemukan`,
      });
    const documentFile = new File();
    console.log(document);
    if (document.file) {
      document.file.file = file.originalname;
      document.file.path = file.path;
      document.file.mimetype = file.mimetype;
    } else {
      documentFile.file = file.originalname;
      documentFile.path = file.path;
      documentFile.mimetype = file.mimetype;
      documentFile.document = document;
    }
    const saved = await this.repo.save(document.file || documentFile);
    if (!saved)
      throw new ErrorResponse({
        code: 500,
        message: 'Gagal menyimpan dokumen',
      });
    return file;
  }

  async findOne(id: number) {
    const file = await this.repo.findOneBy({ id });

    if (!file)
      throw new ErrorResponse({
        code: 404,
        message: `File dengan id ${id} tidak ditemukan`,
      });

    return file;
  }

  async delete(id: number) {
    const file = await this.repo.findOneBy({ id });

    if (!file)
      throw new ErrorResponse({
        code: 404,
        message: `File dengan id ${id} tidak ditemukan`,
      });
    const result = await this.repo.delete({ id });
    if (!result)
      throw new ErrorResponse({
        code: 500,
        message: `Gagal menghapus file`,
      });
    return { message: 'Ok' };
  }
}
