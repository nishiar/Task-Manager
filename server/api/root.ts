import { taskRouter } from '@/server/api/routers/tasks';
import { router } from './trpc';

export const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
