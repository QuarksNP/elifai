import { z } from "zod";

export const SignInFormSchema = z.object({
  user: z.string().min(1),
  password: z.string().min(1),
});

export const SignUpFormSchema = z
  .object({
    fullname: z.string().min(1),
    email: z.string().email(),
    username: z.string().min(1),
    password: z
      .string()
      .min(8)
      .max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
