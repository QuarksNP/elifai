'use client';

import { Button } from '@/modules/core/components/ui/button';

import google_icon from '@/modules/core/assets/svgs/google.svg';
import x_icon from '@/modules/core/assets/svgs/X_Twitter.svg';
import Image from 'next/image';
import { useGoogle } from '../hooks/use-google';
import { useTwitter } from '../hooks/use-twitter';
import { cn } from '@/modules/core/lib/cn';

const ButtonWrapper = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={cn('flex', className)}
    >
      {children}
    </Button>
  );
};

export const GoogleButton = ({ className }: { className?: string }) => {
  const { handleGoogleSignIn } = useGoogle();

  return (
    <ButtonWrapper
      className={className}
      onClick={async () => await handleGoogleSignIn()}
    >
      <Image src={google_icon} alt="google-icon" className="w-6 h-6 mr-auto" />{' '}
      <span className="flex-grow">Continue with Google</span>
    </ButtonWrapper>
  );
};

export const TwitterButton = ({ className }: { className?: string }) => {
  const { handleTwitterSignIn } = useTwitter();

  return (
    <ButtonWrapper
      className={className}
      onClick={async () => await handleTwitterSignIn()}
    >
      <Image src={x_icon} alt="apple-icon" className="w-6 h-6 mr-auto" />{' '}
      <span className="flex-grow">Continue with X</span>
    </ButtonWrapper>
  );
};
