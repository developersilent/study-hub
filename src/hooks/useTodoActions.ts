"use client";

import { useCallback } from "react";
import { useDeleteTodo, useUpdateTodo } from "@/query-calls/todo-query-calls";
import { ErrorToast, SuccessToast } from "@/components/toast";

import { TodoTypeEx } from "../app/todos/types/todo.zod";

type Todo = TodoTypeEx;

interface UseTodoActionsProps {
  todos: Todo[];
  setTodos: (todos: Todo[] | ((prev: Todo[]) => Todo[])) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

export function useTodoActions({
  todos,
  setTodos,
  updateTodo,
  deleteTodo,
}: UseTodoActionsProps) {
  const { mutateAsync: deleteMutate } = useDeleteTodo();
  const { mutateAsync: updateMutate } = useUpdateTodo();

  const deleteTodoHandler = useCallback(
    async (id: string) => {
      const res = await deleteMutate(id);
      if (res.isSuccess) {
        deleteTodo(id);
        SuccessToast(res.Message || "Todo deleted successfully");
      } else {
        ErrorToast(res.Message || "Failed to delete todo");
      }
    },
    [deleteMutate, deleteTodo],
  );

  const toggleTask = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
        pending: !todo.completed,
      };
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));

      SuccessToast("In progress");
      setTimeout(async () => {
        const res = await updateMutate(updatedTodo);
        if (res.isSuccess) {
          SuccessToast(res.Message || "Todo updated successfully");
        } else {
          ErrorToast(res.Message || "Failed to update todo");
        }
      }, 1000);
    },
    [todos, setTodos, updateMutate],
  );

  const updateTodoHandler = useCallback(
    async (id: string, updated: any) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = {
        ...todo,
        ...updated,
      };
      updateTodo(updatedTodo);
      const res = await updateMutate(updatedTodo);
      if (res.isSuccess) {
        SuccessToast(res.Message || "Todo updated successfully");
        return true;
      } else {
        ErrorToast(res.Message || "Failed to update todo");
        return false;
      }
    },
    [updateMutate, todos, updateTodo],
  );

  const getInitialValue = useCallback(
    (id: string) => {
      const data = todos.find((t) => t.id === id);
      if (!data) return undefined;

      let dueDate: Date | undefined = undefined;
      if (data.dueDate) {
        // Since TodoTypeEx.dueDate is Date | undefined, we can use it directly
        dueDate = data.dueDate;
      } else {
        dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }

      return {
        title: data.title,
        description: data.description ?? "",
        category: data.category ?? "",
        completed: data.completed,
        pending: data.pending,
        dueDate,
      };
    },
    [todos],
  );

  return {
    deleteTodoHandler,
    toggleTask,
    updateTodoHandler,
    getInitialValue,
  };
}
