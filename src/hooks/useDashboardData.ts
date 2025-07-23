"use client";

import { useEffect, useState } from "react";
import { useGetTodos } from "@/query-calls/todo-query-calls";
import { Todo } from "../app/types/todo";

export function useDashboardData() {
  const { resData: todosData } = useGetTodos();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (todosData?.isSuccess && todosData.data) {
      const mappedTodos: Todo[] = todosData.data.map((apiTodo: any) => ({
        id: apiTodo.id,
        title: apiTodo.title,
        completed: apiTodo.completed,
        pending: apiTodo.pending,
        description: apiTodo.description || undefined,
        category: apiTodo.category || undefined,
        dueDate: apiTodo.dueDate || undefined,
      }));
      setTodos(mappedTodos);
    }
  }, [todosData]);

  // Calculate todo statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = todos.filter((todo) => !todo.completed).length;
  const overdueTodos = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  }).length;

  // Get today's todos
  const todayTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false;
    const todoDate = new Date(todo.dueDate);
    const today = new Date();
    return todoDate.toDateString() === today.toDateString();
  });

  // Get upcoming todos (next 7 days)
  const upcomingTodos = todos
    .filter((todo) => {
      if (!todo.dueDate || todo.completed) return false;
      const todoDate = new Date(todo.dueDate);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return todoDate > today && todoDate <= nextWeek;
    })
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    );

  // Get high priority todos
  const highPriorityTodos = todos.filter(
    (todo) =>
      !todo.completed &&
      todo.category &&
      ["urgent", "high", "important", "exam", "assignment"].some(
        (keyword) =>
          todo.category!.toLowerCase().includes(keyword) ||
          todo.title.toLowerCase().includes(keyword),
      ),
  );

  // Get unique subjects
  const subjects = [
    ...new Set(todos.map((todo) => todo.category).filter(Boolean)),
  ] as string[];

  return {
    todos,
    totalTodos,
    completedTodos,
    pendingTodos,
    overdueTodos,
    todayTodos,
    upcomingTodos,
    highPriorityTodos,
    subjects,
  };
}
