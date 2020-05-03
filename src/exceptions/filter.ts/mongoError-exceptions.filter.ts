import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import {MongoError} from 'mongodb';

@Catch(MongoError)
export class MongoErrorExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.FORBIDDEN;
    const message = exception.message;
    const name = exception.name;
    const hasErrorLabel = exception.hasErrorLabel;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
        name: name,
        hasErrorLabel: hasErrorLabel
      });
  }
}