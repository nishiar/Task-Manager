'use client';

import React from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  onToggleCompletion: () => void; // Ensure this is included
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  dueDate,
  completed,
  onToggleCompletion,
  onDelete,
}) => {
  return (
    <div className="task-card border p-4 rounded-2xl shadow-sm bg-white transition hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <span className="text-xs text-gray-500">
          Due: {new Date(dueDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center mt-4 gap-3">
        <label htmlFor={`completed-${id}`} className="text-sm text-gray-700">
          Completed
        </label>
        <input
          id={`completed-${id}`}
          type="checkbox"
          checked={completed}
          onChange={onToggleCompletion} // Use the passed toggle function
          className="h-4 w-4 accent-green-600"
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
        <span
          className={`text-xs font-medium ${
            completed ? 'text-green-600' : 'text-yellow-500'
          }`}
        >
          {completed ? 'Completed' : 'In Progress'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
