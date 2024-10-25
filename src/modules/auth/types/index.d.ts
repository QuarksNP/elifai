import type { Prisma } from "@prisma/client";

export type Session = {
  userId: string;
};

export type SignInRequest = {
  user: string;
  password: string;
};

type UserCreateInput = Prisma.UserCreateInput & {
  confirmPassword: string;
};
