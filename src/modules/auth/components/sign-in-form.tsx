'use client';

import { Input } from '@/modules/core/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmit,
} from '@/modules/core/components/ui/form';
import { SignInSchema } from '../lib/definitions';
import { useLogin } from '../hooks/use-login';

export const SignInForm = () => {
  const { values, handleSubmitAction } = useLogin();

  const control = Object.keys(
    SignInSchema.shape,
  ) as (keyof typeof SignInSchema.shape)[];

  return (
    <Form
      action={handleSubmitAction}
      initialState={undefined}
      formAction="post"
      className="space-y-4"
    >
      <FormField
        control={control}
        name="user"
        render={(field) => (
          <FormItem>
            <FormLabel>Email or username</FormLabel>
            <FormControl>
              <Input
                icon="User"
                placeholder="E.g. example@gmail.com"
                defaultValue={values.user}
                required
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={(field) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                password
                icon="Lock"
                placeholder="E.g. *********"
                defaultValue={values.password}
                required
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormSubmit>Sign in</FormSubmit>
    </Form>
  );
};
