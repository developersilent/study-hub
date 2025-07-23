export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  pending: boolean;
  description?: string;
  category?: string;
  dueDate?: string | Date;
}

export interface StudyTip {
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
}
