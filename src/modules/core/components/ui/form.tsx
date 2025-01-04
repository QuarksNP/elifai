import {
  ComponentProps,
  createContext,
  JSX,
  use,
  useActionState,
  useId,
} from 'react';

import NextForm from 'next/form';

import { Button, ButtonProps } from './button';
import { ButtonLoading } from '../button-loading';
import { Slot } from '@radix-ui/react-slot';
import { Label } from './label';
import type { Action, State } from '../../types';
import { cn } from '../../lib/cn';

type InitialState = State | undefined;

type FormContextType = {
  state?: State | null;
  serverErrors?: string | string[] | null;
  pending: boolean;
};

type FormFieldContextType = {
  name: string;
  id: string;
  validationErrors?: string | string[] | null;
};

const FormContext = createContext<FormContextType>({
  state: null,
  serverErrors: null,
  pending: false,
});

const FormFieldContext = createContext<FormFieldContextType>({
  validationErrors: null,
  name: '',
  id: '',
});

const useFormContext = () => {
  const formContext = use(FormContext);
  const fieldContext = use(FormFieldContext);

  return { formContext, fieldContext };
};

const Form = ({
  action,
  initialState,
  children,
  ...props
}: {
  action: Action;
  initialState: InitialState;
} & Omit<ComponentProps<typeof NextForm>, 'action'>) => {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <FormContext.Provider
      value={{
        state,
        pending,
        serverErrors: state?.success ? null : state?.serverErrors,
      }}
    >
      <NextForm action={formAction} {...props}>
        {children}
      </NextForm>
    </FormContext.Provider>
  );
};

const FormField = <T extends readonly string[], N extends T[number]>({
  name,
  render,
}: {
  control: T;
  name: N;
  render: ({ name }: { name: N }) => JSX.Element;
}) => {
  if (!FormContext) {
    throw new Error('FormField must be used within a Form');
  }

  const {
    formContext: { state },
  } = useFormContext();

  return (
    <FormFieldContext.Provider
      value={{
        name,
        id: useId(),
        validationErrors: state?.success
          ? null
          : state?.validationErrors?.[name],
      }}
    >
      {render({ name })}
    </FormFieldContext.Provider>
  );
};

const FormItem = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  if (!FormFieldContext) {
    throw new Error('FormItem must be used within a FormField');
  }

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  );
};

const FormControl = ({ ref, ...props }: ComponentProps<typeof Slot>) => {
  if (!FormContext) {
    throw new Error('FormControl must be used within a Form');
  }

  const {
    fieldContext: { id, validationErrors },
  } = useFormContext();

  return (
    <Slot
      ref={ref}
      id={id}
      aria-describedby={validationErrors ? `${id}-error` : undefined}
      aria-invalid={Boolean(validationErrors)}
      {...props}
    />
  );
};

const FormLabel = ({ className, ...props }: ComponentProps<typeof Label>) => {
  if (!FormFieldContext) {
    throw new Error('FormLabel must be used within a FormField');
  }

  const {
    fieldContext: { id, validationErrors },
  } = useFormContext();

  return (
    <Label
      data-error={validationErrors ? '' : undefined}
      htmlFor={id}
      className={cn('data-[error]:text-destructive', className)}
      {...props}
    />
  );
};

const FormDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  if (!FormContext) {
    throw new Error('FormDescription must be used within a Form');
  }

  const {
    fieldContext: { id },
  } = useFormContext();

  return (
    <p
      id={id}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  if (!FormField) {
    throw new Error('FormMessage must be used within a FormField');
  }

  const {
    fieldContext: { validationErrors },
  } = useFormContext();

  if (!validationErrors) {
    return null;
  }

  return Array.isArray(validationErrors) ? (
    <ul>
      {validationErrors.map((error, i) => (
        <li
          key={`${error}-${i}`}
          className={cn('text-sm font-medium text-destructive')}
        >
          {error}
        </li>
      ))}
    </ul>
  ) : (
    <p
      data-error={validationErrors ? '' : undefined}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {validationErrors}
    </p>
  );
};

const FormSubmit = ({
  children,
  text,
  className,
  ...props
}: Pick<ComponentProps<typeof ButtonLoading>, 'text'> & ButtonProps) => {
  const { pending } = use(FormContext);

  if (pending) {
    return (
      <ButtonLoading
        data-loading={pending}
        text={text}
        className={cn('w-full', className)}
        {...props}
      />
    );
  }

  return (
    <Button
      type="submit"
      data-loading={pending}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
  FormSubmit,
  useFormContext,
};
