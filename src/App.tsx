import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { ThemeProvider, ThemeToggle } from './contexts/ThemeContext';

function App() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    handleDragEnd,
  } = useTodos();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Todo List</h1>
              <ThemeToggle />
            </div>
            <TodoForm onSubmit={addTodo} />
            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onDragEnd={handleDragEnd}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;