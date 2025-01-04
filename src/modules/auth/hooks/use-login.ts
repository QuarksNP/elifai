import { useState } from 'react';
import { signIn } from '../actions/sign-in';
import { toast } from 'sonner';

import type { SignInRequest } from '../types';

export const useLogin = () => {
  const [values, setValues] = useState<SignInRequest>({
    user: '',
    password: '',
  });

  async function handleSubmitAction(
    state: Parameters<typeof signIn>[0],
    formData: FormData,
  ) {
    const user = Object.fromEntries(formData) as SignInRequest;

    setValues(user);

    const result = await signIn(state, user);

    if (!result?.success && result?.serverErrors) {
      toast.error(result.serverErrors);
    }

    return result;
  }

  return { values, handleSubmitAction };
};
