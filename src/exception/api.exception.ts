import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ApiException extends HttpException {
  constructor(code, message = '') {
    super(message, code);
  }
}
