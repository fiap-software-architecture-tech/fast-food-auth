import { ILogger } from '#/domain/services/logger.service';

export class MockLogger implements ILogger {
    info(message: string, context?: Record<string, any>): void {
        console.log(message, context);
    }
    error(message: string, error?: Error, context?: Record<string, any>): void {
        console.error(message, error, context);
    }
    warn(message: string, context?: Record<string, any>): void {
        console.warn(message, context);
    }
    debug(message: string, context?: Record<string, any>): void {
        console.debug(message, context);
    }
}
