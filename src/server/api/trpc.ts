import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { db } from "@/lib/db";

const createTRPCContext = cache(async () => {
  return { db };
});

const t = initTRPC.context<typeof createTRPCContext>().create({});

const router = t.router;
const publicProcedure = t.procedure;

export { createTRPCContext, router, publicProcedure };
