import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "@/lib/db/schema";
import { publicProcedure, router } from "@/server/api/trpc";
import {
  signInValidator,
  signUpValidator,
} from "@/lib/validators/auth-validator";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const authRouter = router({
  signUp: publicProcedure
    .input(signUpValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, email } = input;
      const { db } = ctx;

      const checkEmail = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email));

      if (checkEmail.length === 1) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const password = await bcrypt.hash(input.password, 10);

      await db.insert(users).values({ name, email, password });

      return { success: true };
    }),
  signIn: publicProcedure
    .input(signInValidator)
    .mutation(async ({ input, ctx }) => {
      const { email } = input;
      const { db, resHeaders } = ctx;

      const checkUser = await db
        .select({ id: users.id, name: users.name, password: users.password })
        .from(users)
        .where(eq(users.email, email));

      if (checkUser.length !== 1) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const user = checkUser[0];

      const checkPassword = await bcrypt.compare(input.password, user.password);

      if (!checkPassword) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const exp = 24 * 60 * 60 * 30;

      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET!,
        {
          expiresIn: exp,
        }
      );

      resHeaders.set(
        "Set-Cookie",
        `access_token=${token}; Path=/; Max-Age=${exp}`
      );

      return { success: true };
    }),
});

export { authRouter };
