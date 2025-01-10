'use client';

import { Input } from '@/modules/core/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
            <FormControl>
              <Input
                icon="User"
                placeholder="Username or Email"
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
            <FormControl>
              <Input
                password
                icon="Lock"
                placeholder="Password"
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
