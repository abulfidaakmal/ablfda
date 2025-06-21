import bcrypt from "bcrypt";
import { users } from "@/lib/db/schema";
import { publicProcedure, router } from "@/server/api/trpc";
import { signUpValidator } from "@/lib/validators/auth-validator";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const authRouter = router({
  signUp: publicProcedure
    .input(signUpValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, email } = input;
      const { db } = ctx;

      const checkEmail = await db
        .select({ field1: users.id })
        .from(users)
        .where(eq(users.email, email));

      if (checkEmail.length === 1) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const password = await bcrypt.hash(input.password, 10);

      await db.insert(users).values({ name, email, password });

      return { success: true };
    }),
});

export { authRouter };
