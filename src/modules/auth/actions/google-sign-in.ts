'use server';

import { googleProviderCallback } from '../lib/providers';

export const googleSignIn = async () => {
  const result = await googleProviderCallback();

  console.log(result);
};
