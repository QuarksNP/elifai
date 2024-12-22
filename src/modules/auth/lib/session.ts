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
  const session = await getIronSession<Session>(
    await cookies(),
    SESSION_OPTIONS
  );

  return session;
};

export const setSession = async ({ user }: Pick<Session, "user">) => {
  const session = await getIronSession<Session>(
    await cookies(),
    SESSION_OPTIONS
  );

  Object.assign(session, { user });
  session.expires = new Date(Date.now() + TTL * 1000);

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

  const unparsed: Session = await unsealData(session, {
    password: process.env.SESSION_SECRET as string,
  });

  if (!unparsed.expires || !unparsed.user) {
    return res;
  }

  const expiresAt =
    typeof unparsed.expires === "string"
      ? new Date(unparsed.expires)
      : unparsed.expires;

  if (Date.now() >= expiresAt.getTime()) {
    res.cookies.delete({
      name: SESSION_NAME,
      path: "/",
      sameSite: "lax",
    });
    return res;
  }

  unparsed.expires = new Date(Date.now() + TTL * 1000);

  const parsed = await sealData(unparsed, {
    password: process.env.SESSION_SECRET as string,
    ttl: TTL,
  });

  res.cookies.set({
    ...SESSION_OPTIONS.cookieOptions,
    name: SESSION_NAME,
    value: parsed,
  });

  return res;
};
export const destroySession = async () => {
  const session = await getIronSession<Session>(
    await cookies(),
    SESSION_OPTIONS
  );

  session.destroy();
};
