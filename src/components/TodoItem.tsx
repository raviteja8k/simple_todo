import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash2, GripVertical, Check, X } from 'lucide-react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onUpdate: (id: number, text: string, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ id, text, completed, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSubmit = () => {
    if (editText.trim()) {
      onUpdate(id, editText, completed);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
        completed ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'
      } hover:shadow-md transition-all`}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
      >
        <GripVertical size={20} />
      </button>

      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onUpdate(id, text, e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
      />

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => {
              setEditText(text);
              setIsEditing(false);
            }}
            className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            {text}
          </span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}