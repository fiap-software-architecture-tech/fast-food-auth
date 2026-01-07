import z from 'zod';

const envSchema = z.object({
    // Environment
    NODE_ENV: z.enum(['dev', 'hml', 'prd', 'test']).default('dev'),

    // Server
    PORT: z.coerce.number().default(3000),

    // JWT
    JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
