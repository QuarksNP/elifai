'server-only';

import { generateCodeVerifier, generateState, Google, Twitter } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const setCookies = () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

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

export const twitter = new Twitter(
  process.env.TWITTER_CLIENT_ID as string,
  process.env.TWITTER_CLIENT_SECRET_ID as string,
  process.env.TWITTER_REDIRECT_URI as string
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

export const twitterProviderCallback = cache(async () => {
  const { state, codeVerifier } = setCookies();

  const URL = twitter.createAuthorizationURL(state, codeVerifier, [
    "users.read",
    "tweet.read",
  ]);

  return redirect(URL.toString());
});
