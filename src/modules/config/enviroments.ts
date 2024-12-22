import 'server-only';

export const ENVIRONMENTS = {
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
  TWITTER_REDIRECT_URI: process.env.TWITTER_REDIRECT_URI,
} as const;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export type EnvironmentsType = typeof ENVIRONMENTS;
