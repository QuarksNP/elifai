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
import { useSignUp } from '../hooks/use-sign-up';
import { signUpControl } from '../lib/controls';

export const SignUpForm = () => {
  const {
    values: { fullname, username, email, password, confirmPassword },
    handleSubmitAction,
  } = useSignUp();

  return (
    <Form
      action={handleSubmitAction}
      initialState={undefined}
      formMethod="POST"
      className='space-y-4'
    >
      <FormField
        control={signUpControl}
        name="fullname"
        render={(field) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Full name"
                {...field}
                defaultValue={fullname}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={signUpControl}
        name="username"
        render={(field) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Username"
                {...field}
                defaultValue={username}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={signUpControl}
        name="email"
        render={(field) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Email"
                {...field}
                type="email"
                defaultValue={email}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={signUpControl}
        name="password"
        render={(field) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="password"
                {...field}
                password
                defaultValue={password}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={signUpControl}
        name="confirmPassword"
        render={(field) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Confirm password"
                {...field}
                password
                defaultValue={confirmPassword}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormSubmit>Sign up</FormSubmit>
    </Form>
  );
};
