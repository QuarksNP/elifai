import type { Prisma, Role as PrismaUserRole } from "@prisma/client";

export type Session = {
  user: {
    id: string;
    role: Role | string;
  };
  expires: string | Date;
};

export type SignInRequest = {
  user: string;
  password: string;
};

type UserCreateInput = Prisma.UserCreateInput & {
  confirmPassword: string;
};

export type Role = PrismaUserRole;
