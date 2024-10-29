import { google } from "@/modules/auth/lib/providers";
import { setSession } from "@/modules/auth/lib/session";
import prisma from "@/modules/core/lib/prisma";
import { decodeIdToken } from "arctic";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type GoogleUserToken = {
  iss: string; // Issuer (e.g., "https://accounts.google.com")
  azp: string; // Authorized party (typically client ID)
  aud: string; // Audience (client ID)
  sub: string; // Subject (unique identifier for the user)
  email: string; // User's email
  email_verified: boolean; // Whether the email is verified
  at_hash: string; // Access token hash
  name: string; // Full name of the user
  picture: string; // URL of the user's profile picture
  given_name: string; // First name of the user
  family_name: string; // Last name of the user
  iat: number; // Issued at (timestamp in seconds)
  exp: number; // Expiration time (timestamp in seconds)
};

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  const storedCode = cookies().get("codeVerifier")?.value;
  const storedState = cookies().get("state")?.value;

  try {
    if (code === null || !storedState || state !== storedState || !storedCode) {
      throw new Error("Invalid request");
    }

    const error = req.nextUrl.searchParams.get("error");

    console.log(error);

    if (error === "access_denied") {
      throw new Error("Access denied");
    }
    const tokens = await google.validateAuthorizationCode(code, storedCode);

    const idToken = tokens.idToken();

    const claims = decodeIdToken(idToken) as GoogleUserToken;

    if (!claims) {
      throw new Error("Invalid request");
    }

    const dbUser =
      (await prisma.user.findUnique({
        where: {
          googleId: claims.sub
        },
        select: {
          id: true
        }
      })) ?? 
      (await prisma.user.create({
        data: {
          googleId: claims.sub,
          fullname: claims.name
        },
        select: {
          id: true,
        }
      }))

    await setSession({ userId: dbUser.id });
  } catch (error) {
    console.error(error);
  } finally {
    cookies().delete("codeVerifier");
    cookies().delete("state");
  }

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
