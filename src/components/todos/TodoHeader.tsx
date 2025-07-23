"use client";

import TodoForm from "../../app/todos/todo-form";

export function TodoHeader() {
  return (
    <div className="flex flex-col pt-4 sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          To-Do List
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your tasks and stay productive
        </p>
      </div>
      <div className="shrink-0">
        <TodoForm />
      </div>
    </div>
  );
}
