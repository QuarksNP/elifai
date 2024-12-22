import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InvestmentSchema } from '../lib/definitions';
import { z } from 'zod';

type FormData = z.infer<typeof InvestmentSchema>;

export const useCreateInvestmentAccount = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(InvestmentSchema),
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
      type: 'INVESTMENT',
      returns: 0,
      assetAllocation: '',
      riskProfile: 'LOW',
    },
  });

  async function handleSubmit(data: FormData) {
    console.log(data);
  }

  return { form, handleSubmit };
};
