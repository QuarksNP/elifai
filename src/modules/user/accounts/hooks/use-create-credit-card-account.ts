import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreditCardSchema } from '../lib/definitions';
import { z } from 'zod';

type FormData = z.infer<typeof CreditCardSchema>;

export const useCreateCreditCardAccount = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(CreditCardSchema),
    mode: 'onChange',
    defaultValues: {
      number: '',
      title: '',
      provider: '',
      currentBalance: 0,
      totalBalance: 0,
      securityCode: 0,
      openingDate: new Date(),
      expiresAt: new Date(),
      metadata: '',
      status: 'ACTIVE',
      type: 'CREDIT_CARD',
    },
  });

  async function handleSubmit(data: FormData) {
    console.log(data);
  }

  return { form, handleSubmit };
};
