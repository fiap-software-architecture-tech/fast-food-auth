import { inject, injectable } from 'inversify';

import { IAuthUseCase } from '#/application/use-cases/auth/auth.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { ITokenGeneratorService } from '#/domain/services/token-generator.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { AuthRequest } from '#/interfaces/http/schemas/auth/auth-request.schema';
import { AuthResponse } from '#/interfaces/http/schemas/auth/auth-response.schema';

@injectable()
export class Auth implements IAuthUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.TokenGeneratorService) private readonly tokenGeneratorService: ITokenGeneratorService,
    ) {}

    execute(request: AuthRequest): AuthResponse {
        this.logger.info('Starting authentication', { cpf: request.cpf });
        const { token, expiresIn } = this.tokenGeneratorService.sign(request.cpf);
        this.logger.info('Authentication successful');
        return { token, expiresIn };
    }
}
