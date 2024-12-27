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

type InitialState = unknown;
type State = unknown;
type Action = (state: State) => State;

type FormContextType = {
  state: State | null;
  formAction: (formData: FormData) => void | Promise<void>;
  id: string;
  pending: boolean;
  error?: string;
};

const FormContext = createContext<FormContextType>({
  state: null,
  formAction: () => void {},
  id: '',
  pending: false,
});

const Form = ({
  action,
  initialState,
  children,
  ref,
  ...props
}: {
  action: Action;
  initialState: InitialState;
} & ComponentProps<typeof NextForm>) => {
  const [state, formAction, pending] = useActionState(action, initialState);
  const id = useId();

  return (
    <FormContext.Provider value={{ state, formAction, pending, id }}>
      <NextForm action={formAction} ref={ref} {...props}>
        {children}
      </NextForm>
    </FormContext.Provider>
  );
};

const FormField = ({
  control,
  render,
}: {
  control: string[];
  render: ({ name }: { name: keyof typeof control }) => JSX.Element;
}) => {
  if (!FormContext) {
    throw new Error('FormField must be used within a Form');
  }
  return render;
};

const FormItem = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  if (!FormContext) {
    throw new Error('FormItem must be used within a Form');
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

  const { error, id } = use(FormContext);

  return (
    <Slot
      ref={ref}
      id={id}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
};

const FormLabel = ({ className, ...props }: ComponentProps<typeof Label>) => {
  if (!FormContext) {
    throw new Error('FormLabel must be used within a Form');
  }

  const { id, error } = use(FormContext);

  return (
    <Label
      data-error={error ? '' : undefined}
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

  const { id } = use(FormContext);

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

  const { error } = use(FormContext);

  if (!error) {
    return null;
  }

  return (
    <p
      data-error={error ? '' : undefined}
      className={['text-sm font-medium text-destructive', className].join(' ')}
      {...props}
    />
  );
};

const FormSubmit = ({
  children,
  text,
  ...props
}: Pick<ComponentProps<typeof ButtonLoading>, 'text'> & ButtonProps) => {
  const { pending } = use(FormContext);

  if (pending) {
    return <ButtonLoading text={text} {...props} />;
  }

  return (
    <Button type="submit" {...props}>
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
};
