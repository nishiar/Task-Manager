import { router, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export const taskRouter = router({
  // GET /api/trpc/task.getAllTasks
  getAllTasks: publicProcedure.query(async () => {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' }, // Optionally sort tasks by creation date
    });
  }),

  // POST /api/trpc/task.createTask
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        dueDate: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
          message: 'Invalid date format',
        }),
        completed: z.boolean().optional(), // Optional, defaults to false
      })
    )
    .mutation(async ({ input }) => {
      return prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          dueDate: new Date(input.dueDate),
          completed: input.completed ?? false, // If completed is not provided, default to false
        },
      });
    }),

  // DELETE /api/trpc/task.deleteTask
  deleteTask: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.task.delete({
        where: { id: input.id },
      });
    }),

  // PATCH /api/trpc/task.toggleCompletion
  toggleCompletion: publicProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, completed } = input;

      // Update the task and toggle the completion status
      return prisma.task.update({
        where: { id },
        data: { completed },
      });
    }),
});
