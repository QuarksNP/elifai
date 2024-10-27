import "server-only";

import { cache } from "react";

import { redirect } from "next/navigation";

import { getSession, setSession } from "../lib/session";

import prisma from "@/modules/core/lib/prisma";
import { Prisma } from "@prisma/client";

import { comparePassword, hashPassword } from "../lib/encrypt-password";

import type { Constructor } from "@/modules/core/types";
import type { SignInRequest, UserCreateInput } from "../types";

export const __VERIFY_SESSION__ = cache(async () => {
  const session = await getSession();

  if (!session?.userId) {
    redirect("/");
  }

  return {
    isAuthenticated: true,
    userId: session.userId,
  };
});

export function session<T extends Constructor>(constructor: T) {
  for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
    const originalMethod = constructor.prototype[key];

    if (typeof originalMethod === "function" && key !== "constructor") {
      constructor.prototype[key] = async function (...args: unknown[]) {
        const session = await __VERIFY_SESSION__();

        if (!session) {
          throw new Error(`No session found, cannot execute ${key}`);
        }

        return originalMethod.apply(this, args);
      };
    }
  }
}

export class Auth {
  static signIn = cache(async (data: SignInRequest) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: data.user }, { username: data.user }],
        },
        select: {
          id: true,
          password: true,
        },
      });

      if (!user || !user.password) {
        return { success: false, errors: "Invalid credentials" };
      }

      const isValidPassword = await comparePassword({
        password: data.password,
        hashedPassword: user.password,
      });

      if (!isValidPassword) {
        return { success: false, errors: "Invalid credentials" };
      }

      await setSession({ userId: user.id });

      return { success: true, errors: "User authenticated" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Ups, something went wrong...", {
          cause: error.cause,
        });
      }
      throw new Error("Ups, something went wrong...");
    }
  });

  static signUp = cache(async (data: UserCreateInput) => {
    try {
      if (data.password !== data.confirmPassword) {
        return { success: false, errors: "Your password do not match" };
      }

      const hashedPassword = await hashPassword(data.password);

      const user = await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          fullname: data.fullname,
          password: hashedPassword,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return { success: false, errors: "Error creating user" };
      }

      await setSession({ userId: user.id });

      return { success: true, errors: "User authenticated and created" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Ups, something went wrong...", {
          cause: error.cause,
        });
      }
      throw new Error("Ups, something went wrong...");
    }
  });
}
