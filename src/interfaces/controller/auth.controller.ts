import { inject, injectable } from 'inversify';

import { AuthDto } from '#/application/use-cases/auth/auth.dto';
import { IAuthUseCase } from '#/application/use-cases/auth/auth.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { AuthResponseDTO } from '#/interfaces/presenter/auth/auth-response.dto';
import { AuthPresenter } from '#/interfaces/presenter/auth/auth.presenter';

@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.AuthUseCase) private readonly authUseCase: IAuthUseCase,
    ) {}

    getToken(request: AuthDto): AuthResponseDTO {
        this.logger.info('Generating auth token for user', { cpf: request.cpf });
        const response = this.authUseCase.execute(request);
        return AuthPresenter.toDTO(response);
    }
}
