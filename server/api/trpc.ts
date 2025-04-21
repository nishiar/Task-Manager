import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { TRPCContext } from './trpcContext';

// Initialize tRPC with context type + transformer
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

// Export router and procedures
export const router = t.router;
export const publicProcedure = t.procedure;
