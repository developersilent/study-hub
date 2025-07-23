import { createNewRoute, proctedProcedure } from "../rpc/init";
import { db } from "@/db/db";
import { todoTable, userTable } from "@/db/schema";
import { todoZodObject } from "@/app/todos/types/todo.zod";
import { HTTPException } from "hono/http-exception";
import { asc, desc, eq } from "drizzle-orm";
import z from "zod";

type Todo = typeof todoTable.$inferInsert;

export const totoRoutes = createNewRoute({
  createTodo: proctedProcedure
    .input(todoZodObject)
    .mutation(async ({ c, input }) => {
      const userId = c.get("user")?.id;
      if (!userId) {
        throw new HTTPException(401, {
          message: "Unauthorized: User ID is required",
        });
      }
      const todo: Todo = {
        userId: userId,
        title: input.title,
        category: input.category ?? "",
        pending: true,
        description: input.description ?? "",
        completed: input.completed || false,
        dueDate: input.dueDate || null,
      };
      console.log("Creating Todo:", todo);

      const [newTodo] = await db.insert(todoTable).values(todo).returning();

      if (!newTodo) {
        throw new HTTPException(500, {
          message: "Failed to create todo",
        });
      }

      return c.superjson({
        isSuccess: true,
        Message: "Todo created successfully",
        data: newTodo,
      });
    }),
  getTodos: proctedProcedure.query(async ({ c }) => {
    const userId = c.get("user")?.id;
    if (!userId) {
      throw new HTTPException(401, {
        message: "Unauthorized: User ID is required",
      });
    }
    const todos = await db.query.todoTable.findMany({
      orderBy: [desc(todoTable.created_at)],
      where: eq(todoTable.userId, userId),
    });

    return c.superjson({
      isSuccess: true,
      Message: "Todos fetched successfully",
      data: todos,
    });
  }),
  deleteTodo: proctedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ c, input }) => {
      const userId = c.get("user")?.id;
      if (!userId) {
        throw new HTTPException(401, {
          message: "Unauthorized: User ID is required",
        });
      }
      const todoId = input.id;
      const deletedCount = await db
        .delete(todoTable)
        .where(eq(todoTable.id, todoId))
        .returning();

      if (deletedCount.length === 0) {
        throw new HTTPException(404, {
          message: "Todo not found",
        });
      }

      return c.superjson({
        isSuccess: true,
        Message: "Todo deleted successfully",
      });
    }),
  UpdateTodo: proctedProcedure
    .input(todoZodObject.extend({ id: z.string() }))
    .mutation(async ({ c, input }) => {
      console.log("Updating Todo:", input);
      const userId = c.get("user")?.id;
      if (!userId) {
        throw new HTTPException(401, {
          message: "Unauthorized: User ID is required",
        });
      }
      const todoId = input.id;
      const updatedTodo = {
        title: input.title,
        category: input.category ?? "",
        description: input.description ?? "",
        completed: input.completed || false,
        pending: !input.completed,
        dueDate: input.dueDate || null,
      };

      const [todo] = await db
        .update(todoTable)
        .set(updatedTodo)
        .where(eq(userTable.id, userId) && eq(todoTable.id, todoId))
        .returning();

      if (!todo) {
        throw new HTTPException(404, {
          message: "Todo not found",
        });
      }

      return c.superjson({
        isSuccess: true,
        Message: "Todo updated successfully",
        data: todo,
      });
    }),
});
