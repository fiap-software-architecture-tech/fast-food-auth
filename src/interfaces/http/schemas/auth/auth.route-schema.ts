import { authRequestSchema } from '#/interfaces/http/schemas/auth/auth-request.schema';
import { authResponseSchema } from '#/interfaces/http/schemas/auth/auth-response.schema';
import { badRequestSchema } from '#/interfaces/http/schemas/common/error.schema';

export const authSchema = {
    schema: {
        tags: ['Auth'],
        summary: 'Autenticação de cliente',
        body: authRequestSchema,
        response: {
            200: authResponseSchema,
            400: badRequestSchema,
        },
    },
};
