'use client';

import * as React from 'react';

import { cn } from '../../lib/cn';
import { icons } from 'lucide-react';
import { Label } from './label';
import { Icon } from './icon';
import { useClick } from '../../hooks/use-click';
import { useInputChange } from '../../hooks/use-input-change';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: keyof typeof icons;
  password?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      placeholder,
      icon,
      type,
      password,
      containerClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const [show, onClick] = useClick(true);
    const { value, handleChange } = useInputChange();

    return (
      <Label
        data-has-icon={icon ? '' : undefined}
        data-is-password={password ? '' : undefined}
        className={cn(
          'flex relative items-center h-16 w-full rounded border border-border bg-card text-sm shadow-sm transition-colors data-[has-icon]:pl-3 data-[is-password]:pr-3 has-[:focus]:border-primary',
          containerClassName,
        )}
      >
        {icon && <Icon name={icon} />}
        <input
          type={show && password ? 'password' : type}
          className={cn(
            'peer flex px-3 bg-transparent py-1 h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:none disabled:cursor-not-allowed disabled:opacity-50 w-full mt-auto placeholder:opacity-0',
            className,
          )}
          ref={ref}
          {...props}
          onChange={(e) => {
            props.onChange?.(e);
            handleChange(e.currentTarget.value);
          }}
        />
        <span
          className={cn(
            'absolute px-3 text-base peer-focus:top-2 peer-focus:text-[0.8rem] text-muted-foreground transition-all',
            {
              'top-2 text-[0.8rem]': Boolean(value),
            },
          )}
        >
          {placeholder}
        </span>
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
