import { inject, injectable } from 'inversify';

import { IAuthUseCase } from '#/application/use-cases/auth/auth.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { ITokenGeneratorService, TokenResult } from '#/domain/services/token-generator.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { AuthRequest } from '#/interfaces/http/schemas/auth/auth-request.schema';

@injectable()
export class Auth implements IAuthUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.TokenGeneratorService) private readonly tokenGeneratorService: ITokenGeneratorService,
    ) {}

    execute(request: AuthRequest): TokenResult {
        this.logger.info('Starting authentication', { cpf: request.cpf });
        const result = this.tokenGeneratorService.sign(request.cpf);
        this.logger.info('Authentication successful');
        return result;
    }
}
