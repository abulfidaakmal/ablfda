"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpValidator,
  TSignUpValidator,
} from "@/lib/validators/auth-validator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/trpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 10000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const form = useForm<TSignUpValidator>({
    resolver: zodResolver(signUpValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isSuccess } = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      toast.success("signed in successfully");

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    },
    onError: ({ data }) => {
      if (data?.code === "CONFLICT") {
        setErrorMessage("email already exists");
      }
    },
  });

  const onSubmit = (value: TSignUpValidator) => {
    mutate(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {errorMessage && (
              <p className="text-red-500 font-semibold text-sm text-center mb-2">
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              disabled={isPending || isSuccess}
              className="w-full cursor-pointer"
            >
              {isPending
                ? "Loading..."
                : isSuccess
                ? "Redirecting..."
                : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
