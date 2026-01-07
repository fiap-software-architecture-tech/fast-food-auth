import { IAuthUseCase } from '#/application/use-cases/auth/auth.use-case';
import { AuthRequest } from '#/interfaces/http/schemas/auth/auth-request.schema';
import { AuthResponse } from '#/interfaces/http/schemas/auth/auth-response.schema';

export class AuthUseCaseMock implements IAuthUseCase {
    execute(_request: AuthRequest): AuthResponse {
        return {
            token: '1234567890',
            expiresIn: '1h',
        };
    }
}
