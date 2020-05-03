import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

@Catch(Error.CastError)
export class CastErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error.CastError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.FORBIDDEN;
    const message = exception.message;
    const name = exception.name;    

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
        name: name
      });
  }
}