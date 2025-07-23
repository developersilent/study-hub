"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";
import Link from "next/link";

interface WelcomeHeaderProps {
  username: string;
  currentTime: Date;
  randomQuote: string;
}

export function WelcomeHeader({
  username,
  currentTime,
  randomQuote,
}: WelcomeHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 pt-4 bg-clip-text text-transparent">
            Welcome, {username}
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Link href="/todos">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Add New Task
          </Button>
        </Link>
      </div>
      <Card className="mt-6 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 italic">
              "{randomQuote}"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
