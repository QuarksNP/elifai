'server-only';

import { generateCodeVerifier, generateState, Google } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const setCookies = () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  console.log("clientId", process.env.GOOGLE_CLIENT_ID);

  cookies().set("state", state, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  cookies().set("codeVerifier", codeVerifier, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return { state, codeVerifier };
};

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRECT_ID as string,
  process.env.GOOGLE_REDIRECT_URI as string
);

export const googleProviderCallback = cache(async () => {
  const { state, codeVerifier } = setCookies();

  const URL = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  return redirect(URL.toString());
});
