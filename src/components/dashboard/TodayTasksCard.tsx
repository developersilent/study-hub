"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, CheckSquare } from "lucide-react";
import Link from "next/link";
import { Todo } from "../../app/types/todo";

interface TodayTasksCardProps {
  todayTodos: Todo[];
}

export function TodayTasksCard({ todayTodos }: TodayTasksCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Today's Tasks
        </CardTitle>
        <CardDescription>Tasks due today - stay focused.</CardDescription>
      </CardHeader>
      <CardContent>
        {todayTodos.length === 0 ? (
          <div className="text-center py-8">
            <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No tasks due today! Great job! 🎉
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[240px]">
            <div className="space-y-3 pr-4">
              {todayTodos.map((todo, index) => (
                <div
                  key={todo.id || index}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <CheckSquare
                    className={`h-4 w-4 mt-1 ${
                      todo.completed
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {todo.title}
                    </p>
                    {todo.category && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {todo.category}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        <Link href="/todos">
          <Button className="w-full mt-4" variant="outline">
            View All Tasks
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
