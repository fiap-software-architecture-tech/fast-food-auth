import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify, { FastifyInstance } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { container } from '#/infrastructure/config/di/container';
import { errorHandler } from '#/interfaces/http/middlewares/error-handler';
import { authRoute } from '#/interfaces/http/routes/auth.route';

export async function createApp(): Promise<FastifyInstance> {
    const app = fastify({ logger: true });

    app.decorate('container', container);

    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'API FastFood Auth',
                description: 'Documentação da API FastFood Auth',
                version: '1.0.0',
            },
            tags: [
                {
                    name: 'Auth',
                    description: 'Operações relacionadas a autenticação',
                },
            ],
        },
        transform: jsonSchemaTransform,
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
    });

    app.register(authRoute);

    app.setErrorHandler(errorHandler);

    return app;
}
