import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { CommonCode } from 'src/constants/api-code/common';

@Catch()
export class ExceptionHandler implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.debug(
      `status: ${exception.getStatus?.()}`,
      `message: ${exception.message}`,
      `res message: ${(exception.getResponse?.() as any)?.message}`,
      `${exception.name}`,
    );

    let code,
      message = exception.message,
      timestamp = new Date().toISOString();
    switch (exception.name) {
      case 'BadRequestException':
        const resMessages = (exception.getResponse() as any).message;
        const codes = resMessages.filter((m) => !isNaN(parseFloat(m)));
        const messages = resMessages.filter((m) => !codes.includes(m));

        code = codes.length ? codes.map((x) => +x) : [exception.getStatus()];
        message = messages;
        break;
      case 'NotFoundException':
        code = [CommonCode.ROUTE_NOT_FOUND];
        break;
      case 'QueryFailedError':
        code = [CommonCode.SQL_ERROR];
        break;
      case 'ApiException':
      case 'UnauthorizedException':
        code = [exception.getStatus()];
        break;
      case 'ForbiddenException':
        code = [CommonCode.PERMISSION_DENIED];
        break;
      default:
        code = [CommonCode.SYSTEM_ERROR];
        break;
    }

    response.status(HttpStatus.OK).json({ code, message, timestamp });
  }
}
