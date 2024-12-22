import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SavingsSchema } from '../lib/definitions';
import { z } from 'zod';

type FormData = z.infer<typeof SavingsSchema>;

export const useCreateSavingsAccount = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(SavingsSchema),
    mode: 'onChange',
    defaultValues: {
      number: '',
      title: '',
      provider: '',
      totalBalance: 0,
      securityCode: 0,
      openingDate: new Date(),
      metadata: '',
      status: 'ACTIVE',
      type: 'SAVINGS',
    },
  });

  async function handleSubmit(data: FormData) {
    console.log(data);
  }

  return { form, handleSubmit };
};
