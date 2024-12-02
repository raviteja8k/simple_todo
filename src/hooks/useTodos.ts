import { useState, useCallback, useEffect } from 'react';
import { Todo } from '../types/todo';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const maxPosition = todos.reduce((max, todo) => Math.max(max, todo.position), 0);
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      position: maxPosition + 1
    };
    setTodos(prev => [...prev, newTodo]);
    return true;
  }, [todos]);

  const updateTodo = useCallback((id: number, text: string, completed: boolean) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, text, completed } : todo
      )
    );
    return true;
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    return true;
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        
        // Update positions after reordering
        return reorderedItems.map((item, index) => ({
          ...item,
          position: index + 1
        }));
      });
    }
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    handleDragEnd,
  };
}