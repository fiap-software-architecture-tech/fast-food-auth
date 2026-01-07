import { expect, describe, it } from 'vitest';

import { AuthPresenter } from '#/interfaces/presenter/auth/auth.presenter';

describe('AuthPresenter', () => {
    it('should return a valid auth response', () => {
        const authResponse = AuthPresenter.toHTTP({
            token: '1234567890',
            expiresIn: '1h',
        });
        expect(authResponse).toEqual({
            token: '1234567890',
            expiresIn: '1h',
        });
    });
});
