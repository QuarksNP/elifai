import { SignInSchema } from './definitions';

export const signInControl = Object.keys(
  SignInSchema.shape,
) as (keyof typeof SignInSchema.shape)[];
