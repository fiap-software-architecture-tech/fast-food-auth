import { inject, injectable } from 'inversify';

import { IAuthUseCase } from '#/application/use-cases/auth/auth.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { AuthRequest } from '#/interfaces/http/schemas/auth/auth-request.schema';
import { AuthResponse } from '#/interfaces/http/schemas/auth/auth-response.schema';
import { AuthPresenter } from '#/interfaces/presenter/auth/auth.presenter';

@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.AuthUseCase) private readonly authUseCase: IAuthUseCase,
    ) {}

    getToken(request: AuthRequest): AuthResponse {
        this.logger.info('Generating auth token for user', { cpf: request.cpf });
        const result = this.authUseCase.execute(request);
        return AuthPresenter.toHTTP(result);
    }
}
