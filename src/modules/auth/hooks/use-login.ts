import { useState } from 'react';
import { signIn } from '../actions/sign-in';
import { toast } from 'sonner';

import { notFalsyObjectData } from '@/modules/core/lib/not-falsy-data';

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
    const data = Object.fromEntries(formData) as Partial<SignInRequest>;

    const notFalsyData = notFalsyObjectData<typeof data>(data);

    setValues(notFalsyData);

    const result = await signIn(state, notFalsyData);

    if (!result?.success) {
      toast.error(result?.serverErrors);
    }

    return result;
  }

  return { values, handleSubmitAction };
};
