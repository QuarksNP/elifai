import NextForm from 'next/form';
import {
  ComponentProps,
  createContext,
  JSX,
  use,
  useActionState,
  useId,
} from 'react';
import { Button, ButtonProps } from './button';
import { ButtonLoading } from '../button-loading';
import { Slot } from '@radix-ui/react-slot';
import { Label } from './label';
import type { FormState } from '../../types';

type State = FormState<Record<string, unknown>>;
type InitialState = State | undefined;
type Action = (state: State, payload: FormData) => Promise<State>;

type FormContextType = {
  state?: State | null;
  formAction: (formData: FormData) => void | Promise<void>;
  pending: boolean;
};

type FormFieldContextType = {
  name: string;
  errors?: string | string[];
  id: string;
};

const FormContext = createContext<FormContextType>({
  state: null,
  formAction: () => void {},
  pending: false,
});

const FormFieldContext = createContext<FormFieldContextType>({
  name: '',
  id: '',
  errors: undefined,
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
  ref,
  ...props
}: {
  action: Action;
  initialState: InitialState;
} & Omit<ComponentProps<typeof NextForm>, 'action'>) => {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <FormContext.Provider value={{ state, formAction, pending }}>
      <NextForm action={formAction} ref={ref} {...props}>
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
      value={{ name, id: useId(), errors: state?.errors?.[name] }}
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
    <div className={['space-y-2', className].join(' ')} {...props}>
      {children}
    </div>
  );
};

const FormControl = ({ ref, ...props }: ComponentProps<typeof Slot>) => {
  if (!FormContext) {
    throw new Error('FormControl must be used within a Form');
  }

  const {
    fieldContext: { id, errors },
  } = useFormContext();

  return (
    <Slot
      ref={ref}
      id={id}
      aria-describedby={errors ? `${id}-error` : undefined}
      aria-invalid={Boolean(errors)}
      {...props}
    />
  );
};

const FormLabel = ({ className, ...props }: ComponentProps<typeof Label>) => {
  if (!FormFieldContext) {
    throw new Error('FormLabel must be used within a FormField');
  }

  const {
    fieldContext: { id, errors },
  } = useFormContext();

  return (
    <Label
      data-error={errors ? '' : undefined}
      htmlFor={id}
      className={['[data-error]:text-destructive', className].join(' ')}
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
      className={['text-sm text-muted-foreground', className].join(' ')}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  if (!FormContext) {
    throw new Error('FormMessage must be used within a Form');
  }

  const {
    fieldContext: { errors },
  } = useFormContext();

  if (!errors) {
    return null;
  }

  return (
    <p
      data-error={errors ? '' : undefined}
      className={['text-sm font-medium text-destructive', className].join(' ')}
      {...props}
    >
      {Array.isArray(errors) ? (
        <ul>
          {errors.map((error, i) => (
            <li key={`${error}-${i}`}>{error}</li>
          ))}
        </ul>
      ) : (
        errors
      )}
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
        className={['w-full', className].join(' ')}
        {...props}
      />
    );
  }

  return (
    <Button
      type="submit"
      data-loading={pending}
      className={['w-full', className].join(' ')}
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
