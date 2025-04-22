'use client';

import { trpc } from '@/lib/trpcClient';
import CreateTaskForm from '@/components/Taskform';
import Tasklist from '@/components/Tasklist';
import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/server/api/root';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Task = RouterOutputs['task']['getAllTasks'][number];

export default function HomePage() {
  const tasksQuery = trpc.task.getAllTasks.useQuery();
  const deleteTask = trpc.task.deleteTask.useMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteTask.mutateAsync({ id });
      tasksQuery.refetch(); // Refetch tasks after deletion
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // Ensure tasks are correctly formatted
  const tasksWithCompleted = tasksQuery.data?.map((task: Task) => ({
    ...task,
    completed: task.completed ?? false,
    dueDate: task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate),
  })) ?? [];
  

  return (
    <main className="p-6 max-w-4xl mx-auto bg-background text-foreground rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Task Manager</h1>

      <CreateTaskForm onTaskCreated={() => tasksQuery.refetch()} /> {/* Refresh tasks after creation */}

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-gray-200">Your Tasks</h2>

      {tasksQuery.isLoading ? (
        <p className="text-lg text-gray-500">Loading tasks...</p>
      ) : (
        <Tasklist tasks={tasksWithCompleted} onDeleteTask={handleDelete} />
      )}
    </main>
  );
}
