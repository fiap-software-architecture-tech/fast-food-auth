import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { env } from '#/infrastructure/config/env';

interface ValidationDetail {
    field: string;
    message?: string;
}

interface ErrorResponse {
    error: string;
    message: string;
    details?: ValidationDetail[];
}

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
    request.log.error(
        {
            err: error,
            requestId: request.id,
            url: request.url,
            method: request.method,
        },
        'Request error',
    );

    if (error.validation) {
        const details: ValidationDetail[] = error.validation.map(err => ({
            field: err.instancePath.replace('/', ''),
            message: err.message,
        }));

        const response: ErrorResponse = {
            error: 'Bad Request',
            message: 'Validation failed',
            details,
        };

        reply.status(StatusCodes.BAD_REQUEST).send(response);
        return;
    }

    const statusCode = (error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes;

    const isDevelopment = env.NODE_ENV === 'dev';
    const response: ErrorResponse = {
        error: 'Internal Server Error',
        message: isDevelopment ? error.message : 'An unexpected error occurred',
    };

    reply.status(statusCode).send(response);
}
