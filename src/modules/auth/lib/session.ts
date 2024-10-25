import "server-only";

import { cookies } from "next/headers";

import { getIronSession, SessionOptions } from "iron-session";

import { Session } from "../types";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: new Date(Date.now() + 15 * 60 * 1000),
  },
};

export const getSession = async () => {
  const session = await getIronSession<Session>(cookies(), sessionOptions);

  return session;
};

export const setSession = async (data: Session) => {
  const session = await getSession();

  session.userId = data.userId;

  await session.save();

  return session;
};

export const updateSession = async () => {
  const session = await getIronSession<Session>(cookies(), sessionOptions);

  if (!session || !session.userId) {
    return null;
  }

  const currentSession = await setSession(session);

  return currentSession;
};

export const destroySession = async () => {
  const session = await getIronSession<Session>(cookies(), sessionOptions);

  session.destroy();
};
