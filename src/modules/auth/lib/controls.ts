import { SignInSchema, SignUpSchema } from './definitions';

export const signInControl = Object.keys(
  SignInSchema.shape,
) as (keyof typeof SignInSchema.shape)[];

export const signUpControl = Object.keys(
  SignUpSchema.shape,
) as (keyof typeof SignUpSchema.shape)[];
