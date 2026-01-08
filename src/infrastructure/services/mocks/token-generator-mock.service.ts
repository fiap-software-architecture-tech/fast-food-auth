import { ITokenGeneratorService, TokenResult } from '#/domain/services/token-generator.service';

export class JwtTokenGeneratorMockService implements ITokenGeneratorService {
    sign(_cpf: string): TokenResult {
        return { token: '1234567890', expiresIn: '1h' };
    }
}
