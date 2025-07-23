import { HTTPException } from "hono/http-exception";
import { createNewRoute, proctedProcedure } from "../rpc/init";

export const userRoutes = createNewRoute({
  getUserInfo: proctedProcedure.query(async ({ c }) => {
    // geting session from hono context
    const user = c.get("user");
    if (!user) {
      throw new HTTPException(403, {
        message: "Unauthrized",
      });
    }
    return c.superjson({
      isSuccess: true,
      user,
    });
  }),
});
