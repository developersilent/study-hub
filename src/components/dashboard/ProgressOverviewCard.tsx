"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Award } from "lucide-react";
import { Todo } from "../../app/types/todo";

interface ProgressOverviewCardProps {
  todos: Todo[];
  completedTodos: number;
  totalTodos: number;
  subjects: string[];
}

export function ProgressOverviewCard({
  todos,
  completedTodos,
  totalTodos,
  subjects,
}: ProgressOverviewCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Your Progress
        </CardTitle>
        <CardDescription>Track your academic journey 📈</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Completion</span>
              <span>
                {completedTodos}/{totalTodos} tasks
              </span>
            </div>
            <Progress
              value={totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0}
              className="h-2"
            />
          </div>

          <ScrollArea className="h-[180px]">
            <div className="space-y-4 pr-4">
              {subjects.map((subject, index) => {
                const subjectTodos = todos.filter(
                  (todo) => todo.category === subject,
                );
                const subjectCompleted = subjectTodos.filter(
                  (todo) => todo.completed,
                ).length;
                const progress =
                  subjectTodos.length > 0
                    ? (subjectCompleted / subjectTodos.length) * 100
                    : 0;

                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{subject}</span>
                      <span>
                        {subjectCompleted}/{subjectTodos.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {completedTodos > 0 && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Great job! You've completed {completedTodos} tasks! 🏆
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
