import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorLoggerService } from './error-logger.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    // 全局的错误处理，需注册到app.module下
    constructor(private errorLoggerService: ErrorLoggerService) {
        super();
    }

    handleError(error) {
        this.errorLoggerService.logError(error);
    }
}