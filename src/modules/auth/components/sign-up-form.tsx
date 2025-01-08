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
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Example Example"
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
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. example"
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
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. example@example.com"
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
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. 123456"
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
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. 123456"
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
