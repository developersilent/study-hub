import { Clock, Target, Star, Brain } from "lucide-react";

export const studyTips = [
  { tip: "Break large tasks into smaller chunks", icon: Target },
  { tip: "Use the Pomodoro Technique for focused study", icon: Clock },
  { tip: "Review your notes within 24 hours", icon: Brain },
  { tip: "Set specific goals for each study session", icon: Star },
];

const motivationalQuotes = [
  "Success is the sum of small efforts repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Don't watch the clock; do what it does. Keep going.",
  "Education is the most powerful weapon you can use to change the world.",
];

export const randomQuote: string =
  motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)] ||
  "Success is the sum of small efforts repeated day in and day out.";
