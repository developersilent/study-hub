"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";

import { TodoTypeEx } from "../../app/todos/types/todo.zod";

type Todo = TodoTypeEx;

interface TodoItemProps {
  task: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ task, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <Card
      className={`group transition-all duration-200 hover:shadow-lg border-0 shadow-sm ${
        task.completed
          ? "bg-muted/30 opacity-75"
          : "bg-background hover:bg-muted/20"
      }`}
    >
      <CardContent className="p-0 px-5 m-0">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => task.id && onToggle(task.id)}
            className="mt-1 h-5 w-5"
          />
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h3
                className={`font-semibold text-lg break-words ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex flex-wrap gap-1">
                {task.category && (
                  <Badge
                    variant={task.completed ? "outline" : "secondary"}
                    className={
                      task.completed
                        ? "opacity-60"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }
                  >
                    {task.category}
                  </Badge>
                )}
              </div>
            </div>
            {task.description && (
              <p
                className={`text-muted-foreground break-words leading-relaxed ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.description}
              </p>
            )}
            {task.dueDate && (
              <div
                className={`flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-md px-3 py-1 w-fit ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <Calendar className="h-4 w-4" />
                Due: {task.dueDate.toLocaleDateString()}
              </div>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => task.id && onEdit(task.id)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => task.id && onDelete(task.id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
