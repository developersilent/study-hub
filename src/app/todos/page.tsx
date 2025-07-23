"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { useGetTodos } from "@/query-calls/todo-query-calls";
import { useTodos } from "../../hooks/useTodos";
import { useTodoActions } from "../../hooks/useTodoActions";
import TodoForm from "./todo-form";

import { TodoHeader } from "../../components/todos/TodoHeader";
import { TodoStats } from "../../components/todos/TodoStats";
import { TodoTabs } from "../../components/todos/TodoTabs";

export default function TodoList() {
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { resData: data } = useGetTodos();
  const {
    todos,
    updateTodo,
    setTodos,
    getCompletedTasks,
    getPendingTasks,
    deleteTodo,
  } = useTodos();

  const { deleteTodoHandler, toggleTask, updateTodoHandler, getInitialValue } =
    useTodoActions({
      todos,
      setTodos,
      updateTodo,
      deleteTodo,
    });

  const completedTasks = getCompletedTasks();
  const pendingTasks = getPendingTasks();

  useEffect(() => {
    if (data?.isSuccess && data.data) {
      setTodos(
        data.data.map((task: any) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
          pending: task.pending,
          description: task.description || undefined,
          category: task.category || undefined,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        })),
      );
    }
  }, [data, setTodos, deleteTodo]);

  const handleEdit = (id: string) => {
    setEdit(true);
    setEditId(id);
  };

  const handleUpdateSubmit = async (data: any) => {
    if (editId) {
      const success = await updateTodoHandler(editId, data);
      if (success) {
        setEdit(false);
        setEditId(null);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      <main className="lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <TodoHeader />

          <TodoStats
            totalTasks={todos.length}
            completedTasks={completedTasks.length}
            pendingTasks={pendingTasks.length}
          />

          <TodoTabs
            allTodos={todos}
            pendingTodos={pendingTasks}
            completedTodos={completedTasks}
            onToggle={toggleTask}
            onEdit={handleEdit}
            onDelete={deleteTodoHandler}
          />
        </div>

        {edit && (
          <TodoForm
            onOpenChange={setEdit}
            LabelText="Update Task"
            initialValues={getInitialValue(editId!)}
            open={edit}
            onSubmit={handleUpdateSubmit}
          />
        )}
      </main>
    </div>
  );
}
