import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { prisma } from '../prisma/client';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: process.env.CORS_ORIGIN
    ? [
        process.env.CORS_ORIGIN,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ]
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  advanced: {
    defaultCookieAttributes: {
      domain:
        process.env.NODE_ENV === 'production'
          ? 'paradise-website-six.vercel.app'
          : undefined,
    },
  },
  plugins: [admin()],
});
