import { Container } from 'inversify';

import { ILogger } from '#/domain/services/logger.service';
import { ITokenGeneratorService } from '#/domain/services/token-generator.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { createPinoLogger } from '#/infrastructure/config/logger';
import { JwtTokenGeneratorService } from '#/infrastructure/services/jwt-token-generator.service';
import { PinoLoggerService } from '#/infrastructure/services/pino-logger.service';

export function bindServices(container: Container) {
    container
        .bind<ILogger>(TYPES.Logger)
        .toDynamicValue(() => {
            return new PinoLoggerService(createPinoLogger());
        })
        .inRequestScope();

    container.bind<ITokenGeneratorService>(TYPES.TokenGeneratorService).to(JwtTokenGeneratorService).inSingletonScope();
}
