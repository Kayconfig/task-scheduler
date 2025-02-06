import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionHandlerFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const statusCode = exception.getStatus();

    let message: string | string[] = (
      exception as unknown as { response: { message: string[] } }
    )?.response?.message;

    if (isArray(message)) {
      message = message[0];
    }

    response.status(statusCode).json({
      error: exception.message,
      message: message ? message : exception.message,
      statusCode,
      data: null,
    });
  }
}
