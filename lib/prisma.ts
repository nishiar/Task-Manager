import { PrismaClient } from '@prisma/client';

// Extend global type for TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

// Export the Prisma client
export const prisma =
  globalThis.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
