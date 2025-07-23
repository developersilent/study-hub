import { create } from "zustand";
import { TodoTypeEx } from "../app/todos/types/todo.zod";

interface Todos {
  todos: TodoTypeEx[];
  setTodos: (
    todos: TodoTypeEx[] | ((prev: TodoTypeEx[]) => TodoTypeEx[]),
  ) => void;
  getTodos: () => TodoTypeEx[];
  getCompletedTasks: () => TodoTypeEx[];
  getPendingTasks: () => TodoTypeEx[];
  deleteTodo: (id: string) => void;
  updateTodo: (todo: TodoTypeEx) => void;
}

export const useTodos = create<Todos>((set, get) => ({
  todos: [],
  setTodos: (todosOrUpdater) =>
    set((state) => ({
      todos:
        typeof todosOrUpdater === "function"
          ? (todosOrUpdater as (prev: TodoTypeEx[]) => TodoTypeEx[])(
              state.todos,
            )
          : todosOrUpdater,
    })),
  getTodos: () => get().todos,
  getCompletedTasks: () => get().todos.filter((t) => t.completed),
  getPendingTasks: () => get().todos.filter((t) => !t.completed),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
