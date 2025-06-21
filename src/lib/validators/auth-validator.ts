import { z } from "zod";

export const signUpValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(100, "name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "email is required")
    .max(100, "name must be at most 100 characters")
    .email("invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters")
    .max(20, "password must be at most 20 characters")
    .regex(/[A-Z]/, "password must contain at least one uppercase letter")
    .regex(/[a-z]/, "password must contain at least one lowercase letter")
    .regex(/[0-9]/, "password must contain at least one number"),
});

export type TSignUpValidator = z.infer<typeof signUpValidator>;
