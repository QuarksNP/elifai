'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/core/components/ui/popover';
import { FloatingButton } from '@/modules/core/components/floating-button';
import { createPortal } from 'react-dom';
import { CreditCardDialog } from './forms/credit-card-form';
import { SavingsDialog } from './forms/savings-form';

export const AccountTypes = () => {
  return (
    <>
      {createPortal(
        <Popover>
          <PopoverTrigger className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8">
            <FloatingButton portal={false} />
          </PopoverTrigger>
          <PopoverContent className="shadow-2xl mr-4 max-w-sm w-full grid grid-cols-2 gap-4 [&>button]:w-full">
            <CreditCardDialog />
            <SavingsDialog />
          </PopoverContent>
        </Popover>,
        document.body,
      )}
    </>
  );
};
