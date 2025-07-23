import { client } from "@/server/rpc/api.client";
import { ErrorResponse } from "@/server/types/api.res.types";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const { isPending, data: resData } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      try {
        const apiRes = await client.User.getUserInfo.$get();
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
