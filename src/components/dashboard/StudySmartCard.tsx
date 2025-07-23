"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, AlertCircle, Star } from "lucide-react";
import Link from "next/link";
import { Todo, StudyTip } from "../../app/types/todo";

interface StudySmartCardProps {
  highPriorityTodos: Todo[];
  studyTips: StudyTip[];
}

export function StudySmartCard({
  highPriorityTodos,
  studyTips,
}: StudySmartCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5" />
          Study Smart
        </CardTitle>
        <CardDescription>Tips and priority tasks 💡</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        {highPriorityTodos.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              High Priority Tasks
            </h4>
            <ScrollArea className="h-[120px]">
              <div className="space-y-2 pr-4">
                {highPriorityTodos.map((todo, index) => (
                  <div
                    key={todo.id || index}
                    className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/30 rounded-md hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <AlertCircle className="h-3 w-3 text-red-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 truncate">
                      {todo.title}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Daily Study Tips
          </h4>
          <div className="space-y-3">
            {studyTips.slice(0, 2).map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg"
                >
                  <IconComponent className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {tip.tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
