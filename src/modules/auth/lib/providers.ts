'server-only';

import { ENVIRONMENTS } from '@/modules/config/enviroments';
import { generateCodeVerifier, generateState, Google, Twitter } from 'arctic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const initializeAuthCookies = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const cookiesStore = await cookies();

  cookiesStore.set('state', state, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });

  cookiesStore.set('codeVerifier', codeVerifier, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });

  return { state, codeVerifier };
};

export const google = new Google(
  ENVIRONMENTS.GOOGLE_CLIENT_ID ?? '',
  ENVIRONMENTS.GOOGLE_CLIENT_SECRET ?? '',
  ENVIRONMENTS.GOOGLE_REDIRECT_URI ?? '',
);

export const twitter = new Twitter(
  ENVIRONMENTS.TWITTER_CLIENT_ID ?? '',
  ENVIRONMENTS.TWITTER_CLIENT_SECRET ?? '',
  ENVIRONMENTS.TWITTER_REDIRECT_URI ?? '',
);

export const googleProviderCallback = cache(async () => {
  const { state, codeVerifier } = await initializeAuthCookies();

  const URL = google.createAuthorizationURL(state, codeVerifier, [
    'openid',
    'profile',
    'email',
  ]);

  return redirect(URL.toString());
});

export const twitterProviderCallback = cache(async () => {
  const { state, codeVerifier } = await initializeAuthCookies();

  const URL = twitter.createAuthorizationURL(state, codeVerifier, [
    'users.read',
    'tweet.read',
  ]);

  return redirect(URL.toString());
});
