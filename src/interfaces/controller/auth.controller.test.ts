import { describe, expect, it } from 'vitest';

import { AuthUseCaseMock } from '#/application/use-cases/mocks/auth-use-case-mock';
import { MockLogger } from '#/infrastructure/services/mocks/logger-mock.service';
import { AuthController } from '#/interfaces/controller/auth.controller';

describe('AuthController', () => {
    it('should return a valid auth response', () => {
        const authController = new AuthController(new MockLogger(), new AuthUseCaseMock());
        const authResponse = authController.getToken({ cpf: '1234567890' });
        expect(authResponse).toEqual({
            token: '1234567890',
            expiresIn: '1h',
        });
    });
});
