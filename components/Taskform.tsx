'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpcClient';

// Schema for validation
const TaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  dueDate: z.string(),
});

type TaskFormData = z.infer<typeof TaskSchema>;

// Props for the component to accept a callback for refetch
interface CreateTaskFormProps {
  onTaskCreated: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
  });

  const { mutateAsync, isPending, isError, error } = trpc.task.createTask.useMutation();

  const onSubmit = async (data: TaskFormData) => {
    try {
      await mutateAsync({
        ...data,
        dueDate: new Date(data.dueDate).toISOString(), // Ensure valid date format
      });
      reset(); // Reset the form after successful submission
      onTaskCreated(); // ✅ Notify parent to refetch task list
    } catch (err) {
      console.error('Task creation failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <input
          {...register('title')}
          placeholder="Task Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Task Description"
          className="w-full border p-2 rounded"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <input
          {...register('dueDate')}
          type="date"
          className="w-full border p-2 rounded"
        />
        {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
      </div>

      {isError && <p className="text-red-500">Error: {error?.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {isPending ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default CreateTaskForm;
