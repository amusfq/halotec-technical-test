import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { createResponse } from 'src/helper/response.helper';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { extname, join } from 'path';
import type { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':documentId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (_, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${uuidv4()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @Param('documentId') documentId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return createResponse(await this.filesService.create(documentId, file));
  }

  @Get(':documentId')
  async findOne(
    @Param('documentId') documentId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.filesService.findOne(documentId);
    const stream = await createReadStream(join(process.cwd(), file.path));
    response.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `attachment; filename="${file.file}"`,
    });
    return new StreamableFile(stream);
  }

  @Delete(':documentId')
  async delete(@Param('documentId') documentId: number) {
    return createResponse(await this.filesService.delete(documentId));
  }
}
