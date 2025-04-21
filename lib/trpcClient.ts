// lib/trpcClient.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/root'; // Import your appRouter type

export const trpc = createTRPCReact<AppRouter>();

