"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, Calendar } from "lucide-react";
import { TodoList } from "./TodoList";

import { TodoTypeEx } from "../../app/todos/types/todo.zod";

type Todo = TodoTypeEx;

interface TodoTabsProps {
  allTodos: Todo[];
  pendingTodos: Todo[];
  completedTodos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoTabs({
  allTodos,
  pendingTodos,
  completedTodos,
  onToggle,
  onEdit,
  onDelete,
}: TodoTabsProps) {
  return (
    <Tabs className="mb-6" defaultValue="all">
      <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-muted/50 rounded-xl">
        <TabsTrigger
          value="all"
          className="text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          All Tasks ({allTodos.length})
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          className="text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          Pending ({pendingTodos.length})
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          Completed ({completedTodos.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <TodoList
          todos={allTodos}
          emptyMessage="No tasks yet. Create your first task!"
          emptyIcon={CheckSquare}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="pending">
        <TodoList
          todos={pendingTodos}
          emptyMessage="No pending tasks found."
          emptyIcon={Calendar}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="completed">
        <TodoList
          todos={completedTodos}
          emptyMessage="No completed tasks found."
          emptyIcon={CheckSquare}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
}
