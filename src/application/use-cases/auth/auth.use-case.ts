import { AuthRequest } from '#/interfaces/http/schemas/auth/auth-request.schema';
import { AuthResponse } from '#/interfaces/http/schemas/auth/auth-response.schema';

export interface IAuthUseCase {
    execute(request: AuthRequest): AuthResponse;
}
