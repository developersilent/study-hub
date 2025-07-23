"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Calendar } from "lucide-react";

interface TodoStatsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export function TodoStats({
  totalTasks,
  completedTasks,
  pendingTasks,
}: TodoStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Total Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {totalTasks}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">
            {completedTasks}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
            {pendingTasks}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
