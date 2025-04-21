import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';
import { prisma } from '@/lib/prisma';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';

// Type for tRPC context
export interface TRPCContext {
  session: Session | null;
  prisma: typeof prisma;
}

// For pages/api or adapters/next (req + res)
export const createTRPCContext = async ({ req, res }: CreateNextContextOptions): Promise<TRPCContext> => {
  const session = await getServerSession(req, res, authOptions);
  return {
    session,
    prisma,
  };
};

// For fetch adapter (only req)
export const createFetchTRPCContext = async ({ req }: { req: Request }): Promise<TRPCContext> => {
  // Optionally parse cookies/token here for session
  return {
    session: null,
    prisma,
  };
};
