import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      response
        .status(status)
        .json(
          typeof res === 'object' && res !== null
            ? res
            : { message: String(res) },
        );
      return;
    }

    if (exception instanceof Error) {
      this.logger.error(
        'Unexpected error caught by AllExceptionsFilter: ' + exception.message,
        exception.stack,
      );
    } else {
      this.logger.error('Unexpected non-error thrown: ' + String(exception));
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({ message: 'Something went wrong — please try again later.' });
  }
}
