'use client';

import { Button } from '@/modules/core/components/ui/button';
import { useSearchTerm } from '@/modules/core/hooks/use-search-term';
import { cn } from '@/modules/core/lib/cn';

const forms = [
  {
    name: 'Sign In',
    term: 'sign-in',
  },
  {
    name: 'Sign Up',
    term: 'sign-up',
  },
];

export const SelectAuth = () => {
  const [currentTerm, setSearchTerm] = useSearchTerm({
    defaultValue: 'Sign In',
    param: 'form',
  });

  return (
    <ul className="flex bg-secondary rounded-lg p-1">
      {forms.map(({ name, term }, index) => (
        <li key={index} className="">
          <Button
            variant="ghost"
            size="sm"
            className={cn('w-32 rounded-lg text-muted-foreground', {
              'bg-white text-black hover:bg-white/80': currentTerm === term,
            })}
            onClick={() => setSearchTerm(term)}
          >
            {name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
