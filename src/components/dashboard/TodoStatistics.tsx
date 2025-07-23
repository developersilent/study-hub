"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Clock, AlertCircle, BookOpen } from "lucide-react";

interface TodoStatisticsProps {
  completedTodos: number;
  pendingTodos: number;
  overdueTodos: number;
  totalTodos: number;
  subjectsCount: number;
}

export function TodoStatistics({
  completedTodos,
  pendingTodos,
  overdueTodos,
  totalTodos,
  subjectsCount,
}: TodoStatisticsProps) {
  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">
            {completedTodos}
          </div>
          <p className="text-xs text-green-700 dark:text-green-300">
            {completionRate}% completion rate
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
            {pendingTodos}
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300">
            Tasks to complete
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-red-900 dark:text-red-100">
            {overdueTodos}
          </div>
          <p className="text-xs text-red-700 dark:text-red-300">
            Need attention
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Subjects
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            {subjectsCount}
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-300">
            Active subjects
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
