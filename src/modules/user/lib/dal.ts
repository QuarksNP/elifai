"server-only";

import { __VERIFY_SESSION__, protect } from "@/modules/auth/dal/auth";

import prisma from "@/modules/core/lib/prisma";

@protect
export class User {
  static getUser = async () => {
    try {
      const { userId } = await __VERIFY_SESSION__();

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        select: {
          id: true,
          fullname: true,
          createdAt: true,
        },
      });

      return user;
    } catch {
      throw new Error("Ups, something went wrong...");
    }
  };
}
