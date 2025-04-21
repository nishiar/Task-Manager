'use client';

import { trpc } from '@/lib/trpcClient';
import CreateTaskForm from '@/components/Taskform';
import Tasklist from '@/components/Tasklist';

export default function HomePage() {
  const tasksQuery = trpc.task.getAllTasks.useQuery();
  const deleteTask = trpc.task.deleteTask.useMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteTask.mutateAsync({ id });
      tasksQuery.refetch();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const tasksWithCompleted = tasksQuery.data?.map((task) => ({
    ...task,
    completed: true, // Set a default or real value based on your schema
    dueDate: new Date(task.dueDate), // Ensure it's a Date object if needed
  })) || [];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <CreateTaskForm onTaskCreated={() => tasksQuery.refetch()} />

      <h2 className="text-xl font-semibold mt-10 mb-4">Your Tasks</h2>

      {tasksQuery.isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <Tasklist tasks={tasksWithCompleted} onDeleteTask={handleDelete} />
      )}
    </main>
  );
}
