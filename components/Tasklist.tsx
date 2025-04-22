import React from 'react';
import TaskCard from './Taskcard';
import { trpc } from '@/lib/trpcClient'; // Import trpc client

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  const utils = trpc.useUtils();
  const toggleCompletion = trpc.task.toggleCompletion.useMutation(); // Mutation hook for toggling completion

  const handleToggleCompletion = (id: string, completed: boolean) => {
    toggleCompletion.mutate(
      { id, completed: !completed }, // Toggle the completion status
      {
        onSuccess: () => {
          utils.task.getAllTasks.invalidate(); // Refetch tasks after toggling completion
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate.toLocaleDateString()}
            completed={task.completed}
            onToggleCompletion={() => handleToggleCompletion(task.id, task.completed)} // Pass the toggle function
            onDelete={() => onDeleteTask(task.id)}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
