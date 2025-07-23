import { TodoType, TodoTypeEx } from "@/app/todos/types/todo.zod";
import { client } from "@/server/rpc/api.client";
import { ErrorResponse, SuccessResponse } from "@/server/types/api.res.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateTodo() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (data: TodoType) => {
      try {
        const apiRes = await client.Todo.createTodo.$post(data);
        if (apiRes.ok) {
          const resData = await apiRes.json();
          return resData;
        }
        const resData = (await apiRes.json()) as unknown as ErrorResponse;
        return resData;
      } catch (err) {
        return {
          isSuccess: false,
          Message: String(err),
        } as ErrorResponse;
      }
    },
  });
  return { isPending, resData, mutateAsync };
}

export function useGetTodos() {
  const { isPending, data: resData } = useQuery({
    queryKey: ["getTodos"],
    queryFn: async () => {
      try {
        const apiRes = await client.Todo.getTodos.$get();
        if (apiRes.ok) {
          const resData = await apiRes.json();
          return resData;
        }
        const resData = (await apiRes.json()) as unknown as ErrorResponse;
        return resData;
      } catch (err) {
        return {
          isSuccess: false,
          Message: String(err),
        } as ErrorResponse;
      }
    },
  });
  return { isPending, resData };
}

export function useDeleteTodo() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (id: string) => {
      try {
        const apiRes = await client.Todo.deleteTodo.$post({ id });
        if (apiRes.ok) {
          const resData = await apiRes.json();
          return resData;
        }
        const resData = (await apiRes.json()) as unknown as ErrorResponse;
        return resData;
      } catch (err) {
        return {
          isSuccess: false,
          Message: String(err),
        } as ErrorResponse;
      }
    },
  });
  return { isPending, resData, mutateAsync };
}

export function useUpdateTodo() {
  const {
    isPending,
    mutateAsync,
    data: resData,
  } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (data: TodoTypeEx) => {
      try {
        const apiRes = await client.Todo.UpdateTodo.$post({
          id: data?.id || "",
          ...data,
        });
        if (apiRes.ok) {
          const resData = await apiRes.json();
          return resData;
        }
        const resData = (await apiRes.json()) as unknown as ErrorResponse;
        return resData;
      } catch (err) {
        return {
          isSuccess: false,
          Message: String(err),
        } as ErrorResponse;
      }
    },
  });
  return { isPending, resData, mutateAsync };
}
