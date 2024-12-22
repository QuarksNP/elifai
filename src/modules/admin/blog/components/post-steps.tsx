'use client';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/modules/core/components/breadcroump';
import { useMediaQuery } from '@/modules/core/hooks/use-media-query';
import { cn } from '@/modules/core/lib/cn';
import React from 'react';
import { useHandlePosts } from '../hooks/use-handle-posts';
import { Icon } from '@/modules/core/components/ui/icon';

const STEPS = [
  {
    name: 'Edit',
    step: 0,
  },
  {
    name: 'Preview',
    step: 1,
  },
  {
    name: 'Publish',
    step: 2,
  },
];

export const PostSteps = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { currentStep } = useHandlePosts();

  if (isDesktop) {
    return (
      <aside>
        <nav className="flex gap-8 p-4">
          {STEPS.map(({ step, name }, i) => (
            <div
              key={i}
              className={cn('flex items-center text-lg gap-4', {
                'opacity-50': step > currentStep,
                'font-bold': step === currentStep,
              })}
            >
              <div
                className={cn(
                  'rounded-full w-10 h-10 border border-muted-foreground flex justify-center items-center group-hover:border-primary',
                  {
                    'bg-primary border-none': step === currentStep,
                    'bg-primary/50 border-none': step < currentStep,
                  },
                )}
              >
                {step < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span>{step + 1}</span>
                )}
              </div>
              <span>{name}</span>
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <header className="flex items-center justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {STEPS.map(({ step, name }, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                {step === currentStep ? (
                  <BreadcrumbPage className="font-bold">{name}</BreadcrumbPage>
                ) : (
                  <span>{name}</span>
                )}
              </BreadcrumbItem>
              {i < STEPS.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
