import { describe, expect, it, vi } from 'vitest';

import { Auth } from '#/application/use-cases/auth/auth';
import { MockLogger } from '#/infrastructure/services/mocks/logger-mock.service';
import { JwtTokenGeneratorMockService } from '#/infrastructure/services/mocks/token-generator-mock.service';

describe('auth use case', () => {
    const mockTokenSign = vi.spyOn(JwtTokenGeneratorMockService.prototype, 'sign');
    const loggerInfo = vi.spyOn(MockLogger.prototype, 'info');
    it('should return a valid auth response', () => {
        const authUseCase = new Auth(new MockLogger(), new JwtTokenGeneratorMockService());
        const authResponse = authUseCase.execute({ cpf: '1234567890' });

        expect(mockTokenSign).toHaveBeenCalledWith('1234567890');
        expect(loggerInfo).toHaveBeenCalledWith('Starting authentication', { cpf: '1234567890' });
        expect(loggerInfo).toHaveBeenCalledWith('Authentication successful');
        expect(authResponse).toEqual({
            token: '1234567890',
            expiresIn: '1h',
        });
    });
});
