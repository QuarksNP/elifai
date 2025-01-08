import { z } from 'zod';
import { SignUpSchema } from '../lib/definitions';
import { signUp } from '../actions/sign-up';
import { toast } from 'sonner';
import { useState } from 'react';
import { notFalsyObjectData } from '@/modules/core/lib/not-falsy-data';

type SignUpFormData = z.infer<typeof SignUpSchema>;

export const useSignUp = () => {
  const [values, setValues] = useState<SignUpFormData>({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function handleSubmitAction(
    state: Parameters<typeof signUp>[0],
    formData: FormData,
  ) {
    const data = Object.fromEntries(formData) as Partial<SignUpFormData>;

    const notFalsyData = notFalsyObjectData(data);

    setValues(notFalsyData);

    try {
      const result = await signUp(state, notFalsyData);

      console.log(result);

      if (!result?.success && result?.serverErrors) {
        toast.error(result.serverErrors);
      }

      return result;
    } catch {
      toast.error('Something went wrong');
    }
  }

  return {
    values,
    handleSubmitAction,
  };
};
