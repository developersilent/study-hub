import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { userTable } from "./user.m";

export const todoTable = pgTable("todo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  pending: boolean("pending").notNull().default(true),
  category: text("category"),
  dueDate: timestamp("due_date", {
    withTimezone: true,
    mode: "date",
  }),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updated_at: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
