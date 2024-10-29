"server-only";

import { protect } from "@/modules/auth/dal/auth";

import prisma from "@/modules/core/lib/prisma";
import { cache } from "react";

@protect
export class User {
  static getUser = cache(async (userId: string) => {
    try {
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
    } catch (error){
        console.log(error);
      throw new Error("Ups, something went wrong...");
    }
  });
}
