import { twitter } from "@/modules/auth/lib/providers";
import { setSession } from "@/modules/auth/lib/session";
import prisma from "@/modules/core/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

type TwitterUserResponse = {
  data: {
    id: string;
    name: string;
    username: string;
  };
};

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  const cookiesStore = await cookies();

  const storedCode = cookiesStore.get("codeVerifier")?.value;
  const storedState = cookiesStore.get("state")?.value;

  try {
    if (code === null || !storedState || state !== storedState || !storedCode) {
      throw new Error("Invalid request");
    }

    const tokens = await twitter.validateAuthorizationCode(code, storedCode);

    const accessToken = tokens.accessToken();

    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user: TwitterUserResponse = await response.json();

    const dbUser =
      (await prisma.user.findUnique({
        where: {
          twitterId: user.data.id,
        },

        select: {
          id: true,
          role: true,
        },
      })) ??
      (await prisma.user.create({
        data: {
          twitterId: user.data.id,
          fullname: user.data.name,
        },

        select: {
          id: true,
          role: true,
        },
      }));

    await setSession({
      user: dbUser,
    });
  } catch (error) {
    console.log(error);
  } finally {
    cookiesStore.delete("codeVerifier");
    cookiesStore.delete("state");
  }

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
