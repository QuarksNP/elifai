import "server-only";

import prisma from "@/modules/core/lib/prisma";
import { cache } from "react";

class User {
  static async verifyUsername(username: string) {
    try {
      if (!username) {
        return {
          success: false,
          errors: "There is no an identification to validate the user",
        };
      }

      const userExists =
        (await prisma.user.count({
          where: {
            username,
          },
        })) > 0;

      if (userExists) {
        return {
          success: false,
          errors: "This username already exists",
        };
      }

      return { success: true, errors: "Valid credentials" };
    } catch (error) {
      console.log(error);
      throw new Error("Ups, something went wrong...");
    }
  }

  static async verifyEmail(email: string) {
    try {
      if (!email) {
        return {
          success: false,
          errors: "There is no an identification to validate the user",
        };
      }

      const userExists =
        (await prisma.user.count({
          where: {
            email,
          },
        })) > 0;

      if (userExists) {
        return {
          success: false,
          errors: "This email already exists",
        };
      }

      return { success: true, errors: "Valid credentials" };
    } catch (error) {
      console.log(error);
      throw new Error("Ups, something went wrong...");
    }
  }

  static async getUser(userId: string) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          id: true,
          fullname: true,
          createdAt: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Ups, something went wrong...");
    }
  }
}

User.verifyUsername = cache(User.verifyUsername);
User.verifyEmail = cache(User.verifyEmail);
User.getUser = cache(User.getUser);

export { User };
