import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionHandlerFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const statusCode = exception.getStatus();

    const message = (
      exception as unknown as { response: { message: string[] } }
    )?.response?.message?.[0];

    console.log({ exception });
    response.status(statusCode).json({
      error: exception.message,
      message: message ? message : exception.message,
      statusCode,
      data: null,
    });
  }
}
