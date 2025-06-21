import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { db } from "@/lib/db";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const createTRPCContext = cache(
  async ({ resHeaders }: FetchCreateContextFnOptions) => {
    return { db, resHeaders };
  }
);

const t = initTRPC.context<typeof createTRPCContext>().create({});

const router = t.router;
const publicProcedure = t.procedure;

export { createTRPCContext, router, publicProcedure };
