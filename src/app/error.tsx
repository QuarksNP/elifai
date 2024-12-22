'use client';

import { LogoutBtn } from '@/modules/auth/components/logout-btn';
import { AuthError } from '@/modules/auth/errors/auth_error';
import { Blockquote } from '@/modules/core/components/ui/blockquote';
import { Button } from '@/modules/core/components/ui/button';
import { Separator } from '@/modules/core/components/ui/separator';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error instanceof AuthError) {
      console.error(error);
    } else {
      console.error('Ups, something went wrong...', error.name);
    }
  }, [error]);

  console.log(error);

  return (
    <section className="h-[calc(100vh_-_2rem)] flex flex-col items-center justify-center gap-4 p-4 text-muted-foreground">
      <header className="flex gap-2 items-center justify-center text-center">
        <h2 className="text-xl font-bold">{error.name}</h2>
        <Separator orientation="vertical" />
        <p className="text-sm">{error.message}</p>
      </header>
      <Blockquote>
        Try logging out or deleting your cookies manually.
      </Blockquote>
      <div className="flex flex-wrap gap-2">
        <LogoutBtn variant="link" />
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </section>
  );
}
