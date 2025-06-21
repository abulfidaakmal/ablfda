import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        onError: () => {
          toast.error("something went wrong");
        },
      },
    },
  });
};

export { makeQueryClient };
