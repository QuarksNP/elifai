'use client';

import * as React from 'react';

import { cn } from '../../lib/cn';
import { icons } from 'lucide-react';
import { Label } from './label';
import { Icon } from './icon';
import { useClick } from '../../hooks/use-click';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: keyof typeof icons;
  password?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, icon, type, password, containerClassName, children, ...props },
    ref,
  ) => {
    const [show, onClick] = useClick(true);

    return (
      <Label
        data-has-icon={icon ? '' : undefined}
        data-is-password={password ? '' : undefined}
        className={cn(
          'flex items-center h-9 w-full rounded border border-border bg-card text-sm shadow-sm transition-colors data-[has-icon]:pl-3 data-[is-password]:pr-3 has-[:focus]:border-primary',
          containerClassName,
        )}
      >
        {icon && <Icon name={icon} />}
        <input
          type={show && password ? 'password' : type}
          className={cn(
            'flex px-3 bg-transparent py-1 h-full placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:none disabled:cursor-not-allowed disabled:opacity-50 w-full',
            className,
          )}
          ref={ref}
          {...props}
        />
        {password && (
          <button
            type="button"
            onClick={onClick}
            data-is-showed={show ? '' : undefined}
            className="group"
          >
            <Icon
              name={show ? 'EyeOff' : 'Eye'}
              className="text-primary group-data-[is-showed]:text-muted-foreground"
            />
          </button>
        )}
        {children}
      </Label>
    );
  },
);
Input.displayName = 'Input';

export { Input };
