'use client';

import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  onToggleCompletion: () => void;
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
    <Card className="w-full max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white transition duration-300 hover:shadow-xl">
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            Due: {new Date(dueDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            id={`completed-${id}`}
            type="checkbox"
            checked={completed}
            onChange={onToggleCompletion}
            className="h-5 w-5 accent-green-600 rounded-md"
          />
          <label htmlFor={`completed-${id}`} className="text-sm text-gray-700">
            Completed
          </label>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          >
            Delete
          </button>
          <span
            className={`text-xs font-medium ${
              completed ? "text-green-600" : "text-yellow-500"
            }`}
          >
            {completed ? "Completed" : "In Progress"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
