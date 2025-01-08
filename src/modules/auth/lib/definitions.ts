import { z } from 'zod';

export const SignInSchema = z.object({
  user: z.string().min(1),
  password: z.string().min(1),
});

export const SignUpSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[A-Z]).+$/,
      'Password must contain at least one uppercase letter',
    )
    .regex(
      /^(?=.*[a-z]).+$/,
      'Password must contain at least one lowercase letter',
    )
    .regex(
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|[0-9]).+$/,
      'Password must container at least one special or numeric character',
    ),
  confirmPassword: z.string(),
});
