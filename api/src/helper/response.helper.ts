import { HttpException } from '@nestjs/common';

type CreateResponseProps<T> = {
  data: T;
  message?: string;
};

export function createResponse<T>(
  data: T,
  message = 'Data berhasil ditampilkan.',
): CreateResponseProps<T> {
  return { message, data };
}

interface ErrorResponseType {
  status?: string;
  code: number;
  message?: string;
  errors?: { field: string; message: string }[];
}

export class ErrorResponse extends HttpException {
  constructor({
    status = 'error',
    code,
    message = 'Data tidak ditemukan.',
    errors,
  }: ErrorResponseType) {
    super({ status, code, message, errors }, code);
  }
}
