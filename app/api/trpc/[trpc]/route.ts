export const runtime = 'nodejs';

import { appRouter } from '@/server/api/root';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createFetchTRPCContext } from '@/server/api/trpcContext';

// ✅ async handler to await context creation
const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => await createFetchTRPCContext({ req }),
  });
};

export { handler as GET, handler as POST };
