"use client";
import { useState } from "react";

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );
  Notification.requestPermission().then((permission) => {
    setPermission(permission);
  });

  const pushNotification = (title: string, options?: NotificationOptions) => {
    if (permission === "granted") {
      new Notification(title, options);
    } else if (permission === "denied") {
      console.warn("Notification permission denied");
    } else {
      console.warn("Notification permission not granted yet");
    }
  };

  return { permission, pushNotification };
}
