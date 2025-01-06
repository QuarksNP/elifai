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
import { useLogin } from '../hooks/use-login';
import { signInControl } from '../lib/controls';

export const SignInForm = () => {
  const { values, handleSubmitAction } = useLogin();

  return (
    <Form
      action={handleSubmitAction}
      initialState={undefined}
      formMethod="POST"
      className="space-y-4"
    >
      <FormField
        control={signInControl}
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
        control={signInControl}
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
