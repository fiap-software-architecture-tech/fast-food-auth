import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/di/types';
import { AuthController } from '#/interfaces/controller/auth.controller';
import { AuthRequest } from '#/interfaces/http/schemas/auth/auth-request.schema';
import { authSchema } from '#/interfaces/http/schemas/auth/auth.route-schema';

export const authRoute = (app: FastifyInstance) => {
    const controller = app.container.get<AuthController>(TYPES.AuthController);

    app.post<{ Body: AuthRequest }>('/auth', authSchema, async (req, reply) => {
        const response = controller.getToken(req.body);
        return reply.status(200).send(response);
    });
};
