"use server";

import { twitterProviderCallback } from "../lib/providers";

export const twitterSignIn = async () => {
  const result = await twitterProviderCallback();

  return result;
};
