import z from "zod";

export const todoZodObject = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
  description: z
    .string()
    .max(500, { message: "Description is too long" })
    .optional(),
  completed: z.boolean(),
  pending: z.boolean(),
  category: z.string().max(50, { message: "Category is too long" }).optional(),
  dueDate: z.date().optional(),
});

export interface TodoTypeEx extends z.infer<typeof todoZodObject> {
  id?: string;
}

export type TodoType = z.infer<typeof todoZodObject>;
