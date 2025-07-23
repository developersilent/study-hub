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
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Todo } from "../../app/types/todo";

interface UpcomingTasksCardProps {
  upcomingTodos: Todo[];
}

export function UpcomingTasksCard({ upcomingTodos }: UpcomingTasksCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5" />
          Upcoming This Week
        </CardTitle>
        <CardDescription>Plan ahead for success 📅</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        {upcomingTodos.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No upcoming tasks this week!
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[240px]">
            <div className="space-y-3 pr-4">
              {upcomingTodos.map((todo, index) => (
                <div
                  key={todo.id || index}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <Calendar className="h-4 w-4 mt-1 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{todo.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        Due:{" "}
                        {todo.dueDate
                          ? new Date(todo.dueDate).toLocaleDateString()
                          : "No due date"}
                      </p>
                      {todo.category && (
                        <Badge variant="outline" className="text-xs">
                          {todo.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        <Link href="/todos">
          <Button className="w-full mt-4" variant="outline">
            Plan Your Week
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
