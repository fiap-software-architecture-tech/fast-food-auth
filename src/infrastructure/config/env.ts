import z from 'zod';

const envSchema = z.object({
    // Environment
    NODE_ENV: z.enum(['dev', 'hml', 'prd']).default('dev'),

    // JWT
    JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
