"use client";
import { Plus, AlertCircle, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TodoType, todoZodObject } from "./types/todo.zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ErrorToast, SuccessToast } from "@/components/toast";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/query-calls/todo-query-calls";
import { useQueryClient } from "@tanstack/react-query";
import { DatePicker } from "@/components/date-picker";
import { useState } from "react";
import * as React from "react";
import { useTodos } from "../../hooks/useTodos";

interface TodoFormProps {
  initialValues?: Partial<TodoType>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: TodoType) => Promise<void> | void;
  LabelText?: string;
}

export default function TodoForm({
  initialValues,
  open: controlledOpen,
  onOpenChange,
  LabelText,
  onSubmit,
}: TodoFormProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const isControlled =
    controlledOpen !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? controlledOpen : open;
  const setDialogOpen = isControlled ? onOpenChange! : setOpen;
  const { isPending, mutateAsync } = useCreateTodo();
  const rhf = useForm<TodoType>({
    resolver: zodResolver(todoZodObject),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      category: initialValues?.category ?? "",
      completed: initialValues?.completed ?? false,
      pending: initialValues?.pending ?? false,
      dueDate:
        initialValues?.dueDate ?? new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  React.useEffect(() => {
    if (initialValues) {
      let resetDueDate: Date;
      if (initialValues.dueDate) {
        try {
          resetDueDate =
            initialValues.dueDate instanceof Date
              ? initialValues.dueDate
              : new Date(initialValues.dueDate);

          if (isNaN(resetDueDate.getTime())) {
            throw new Error("Invalid date");
          }
        } catch (error) {
          resetDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }
      } else {
        resetDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }

      rhf.reset({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        category: initialValues.category ?? "",
        completed: initialValues.completed ?? false,
        pending: initialValues.pending ?? false,
        dueDate: resetDueDate,
      });
    }
  }, [initialValues, rhf]);

  const handleSubmit = async (data: TodoType) => {
    if (onSubmit) {
      console.log("Submitting Todo:", data);
      await onSubmit(data);
      setDialogOpen(false);
      return;
    }
    const res = await mutateAsync(data, {
      onSuccess(newTodoRes) {
        if (!newTodoRes || !newTodoRes.isSuccess) {
          ErrorToast(newTodoRes?.Message || "Failed to create todo");
          return;
        }
        queryClient.invalidateQueries({ queryKey: ["getTodos"] });
        rhf.reset({
          title: "",
          description: "",
          category: "",
          completed: false,
          pending: false,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        setDialogOpen(false);
      },
    });
    if (res.isSuccess) {
      SuccessToast(res.Message);
    } else {
      ErrorToast(res.Message);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {!isControlled && (
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md">
        <DialogHeader>
          <DialogTitle>{onSubmit ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {onSubmit
              ? "Edit your task details."
              : "Create a new task or assignment to track."}
          </DialogDescription>
        </DialogHeader>
        <Form {...rhf}>
          <form
            onSubmit={rhf.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2.5"
          >
            <div className="space-y-[12px]">
              {/* Title Input */}
              <FormField
                control={rhf.control}
                name="title"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="title"
                          type="text"
                          autoComplete="off"
                          placeholder="Title"
                          className={`max-sm:h-10 px-3 text-xs placeholder:text-xs transition-all duration-300 ${formState.errors.title ? "pr-9.5 pl-3 focus-visible:ring-ring/75" : null}`}
                          {...field}
                        />
                        {formState.errors.title && (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertCircle size={15} className="text-rose-600" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-200 ease-in-out" />
                  </FormItem>
                )}
              />

              {/* Description Input */}
              <FormField
                control={rhf.control}
                name="description"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          id="description"
                          autoComplete="off"
                          placeholder="Description"
                          className={`max-sm:h-10 px-3 text-xs placeholder:text-xs transition-all duration-300 ${formState.errors.description ? "pr-9.5 pl-3 focus-visible:ring-ring/75" : null}`}
                          {...field}
                        />
                        {formState.errors.description && (
                          <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                            <AlertCircle size={15} className="text-rose-600" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-200 ease-in-out" />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Input */}
            <FormField
              control={rhf.control}
              name="category"
              render={({ field, formState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="category"
                        type="text"
                        autoComplete="off"
                        placeholder="eg: Math, Science"
                        className={`max-sm:h-10 px-3 text-xs placeholder:text-xs transition-all duration-300 ${formState.errors.title ? "pr-9.5 pl-3 focus-visible:ring-ring/75" : null}`}
                        {...field}
                      />
                      {formState.errors.category && (
                        <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 grid h-full w-[10%] place-content-center rounded-full px-0.5">
                          <AlertCircle size={15} className="text-rose-600" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-200 ease-in-out" />
                </FormItem>
              )}
            />

            {/* Date Input */}
            <FormField
              control={rhf.control}
              name="dueDate"
              render={({ field, formState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <DatePicker
                        LabelText="Due Date"
                        initalDate={field.value}
                        onDateChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="px-2 text-[10.6px] text-rose-500 transition-opacity duration-200 ease-in-out" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="my-4">
              <Button className="text-xs w-full" type="submit">
                {isPending ? (
                  <Loader2
                    size={30}
                    className="animate-spin duration-[370ms]"
                  />
                ) : (
                  <span className="text-sm text-primary-foreground">
                    {LabelText || "Create Task"}
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
