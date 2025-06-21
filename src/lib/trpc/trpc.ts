import { AppRouter } from "@/server/api/route";
import { createTRPCReact } from "@trpc/react-query";

const trpc = createTRPCReact<AppRouter>();

export { trpc };
