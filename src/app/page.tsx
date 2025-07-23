"use client";

import { Navigation } from "@/components/navigation";
import { cache, useEffect, useState } from "react";
import { randomQuote, studyTips } from "@/data/data";
import { useGetUser } from "@/query-calls/user-query-call";
import { useDashboardData } from "../hooks/useDashboardData";

import { WelcomeHeader } from "../components/dashboard/WelcomeHeader";
import { TodoStatistics } from "../components/dashboard/TodoStatistics";
import { TodayTasksCard } from "../components/dashboard/TodayTasksCard";
import { UpcomingTasksCard } from "../components/dashboard/UpcomingTasksCard";
import { ProgressOverviewCard } from "../components/dashboard/ProgressOverviewCard";
import { StudySmartCard } from "../components/dashboard/StudySmartCard";

export default function Dashboard() {
  const { resData } = useGetUser();
  const user = resData;
  const [currentTime, setCurrentTime] = useState(new Date());

  const {
    todos,
    totalTodos,
    completedTodos,
    pendingTodos,
    overdueTodos,
    todayTodos,
    upcomingTodos,
    highPriorityTodos,
    subjects,
  } = useDashboardData();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const username = user?.isSuccess ? user.user.data.username : "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      <main className="lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <WelcomeHeader
            username={username}
            currentTime={currentTime}
            randomQuote={randomQuote}
          />

          <TodoStatistics
            completedTodos={completedTodos}
            pendingTodos={pendingTodos}
            overdueTodos={overdueTodos}
            totalTodos={totalTodos}
            subjectsCount={subjects.length}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            <TodayTasksCard todayTodos={todayTodos} />
            <UpcomingTasksCard upcomingTodos={upcomingTodos} />
            <ProgressOverviewCard
              todos={todos}
              completedTodos={completedTodos}
              totalTodos={totalTodos}
              subjects={subjects}
            />
            <StudySmartCard
              highPriorityTodos={highPriorityTodos}
              studyTips={studyTips}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
