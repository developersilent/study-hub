"use client";

import { CheckSquare, Calendar } from "lucide-react";
import { TodoItem } from "./TodoItem";

import { TodoTypeEx } from "../../app/todos/types/todo.zod";

type Todo = TodoTypeEx;

interface TodoListProps {
  todos: Todo[];
  emptyMessage: string;
  emptyIcon: React.ComponentType<{ className?: string }>;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  emptyMessage,
  emptyIcon: EmptyIcon,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <EmptyIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
