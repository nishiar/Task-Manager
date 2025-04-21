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
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
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
