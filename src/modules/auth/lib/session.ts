import "server-only";

import { cookies } from "next/headers";

import {
  getIronSession,
  SessionOptions,
  sealData,
  unsealData,
} from "iron-session";

import { Session } from "../types";
import { NextRequest, NextResponse } from "next/server";

const TTL = 3 * 24 * 60 * 60;
const SESSION_NAME = "session";

export const SESSION_OPTIONS: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: SESSION_NAME,
  ttl: TTL,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: TTL - 60,
    path: "/",
    sameSite: "lax",
  },
};

export const getSession = async () => {
  const session = await getIronSession<Session>(cookies(), SESSION_OPTIONS);

  return session;
};

export const setSession = async (data: { userId: string }) => {
  const session = await getIronSession<Session>(cookies(), SESSION_OPTIONS);

  session.userId = data.userId;
  session.expires = Date.now() + TTL * 1000;

  await session.save();

  return session;
};

export const refreshSession = async (
  req: NextRequest
): Promise<NextResponse> => {
  const session = req.cookies.get(SESSION_NAME)?.value;

  const res = NextResponse.next();

  if (!session) {
    return res;
  }

  const parsed: Session = await unsealData(session, {
    password: process.env.SESSION_SECRET as string,
  });

  if (Date.now() >= parsed.expires) {
    res.cookies.delete({
      name: SESSION_NAME,
      path: "/",
      sameSite: "lax",
    });
    return res;
  }

  parsed.expires = Date.now() + TTL * 1000;

  res.cookies.set({
    ...SESSION_OPTIONS.cookieOptions,
    name: SESSION_NAME,
    value: await sealData(parsed, {
      password: process.env.SESSION_SECRET as string,
      ttl: TTL,
    }),
  });

  return res;
};
export const destroySession = async () => {
  const session = await getIronSession<Session>(cookies(), SESSION_OPTIONS);

  session.destroy();
};
