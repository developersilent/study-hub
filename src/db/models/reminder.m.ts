import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { userTable } from "./user.m";

export const reminderTable = pgTable("reminder", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "exam" | "personal" | "class"
  reminderDate: timestamp("reminder_date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  reminderTime: text("reminder_time").notNull(),
  recurring: boolean("recurring").notNull().default(false),
  active: boolean("active").notNull().default(true),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updated_at: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
