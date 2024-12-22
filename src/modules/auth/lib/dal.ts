import 'server-only';

import { cache } from 'react';

import { redirect } from 'next/navigation';

import { setSession, getSession } from './session';

import prisma from '@/modules/core/lib/prisma';

import { comparePassword, hashPassword } from './encrypt-password';

import type { Role, SignInRequest, UserCreateInput } from '../types';

export const _verifySession = cache(async () => {
  const session = await getSession();

  if (!session.user.id || !session.expires) {
    redirect('/');
  }

  return {
    isAuthenticated: true,
    user: {
      id: session.user.id,
      role: session.user.role as Role,
    },
    expires: session.expires,
  };
});

class Auth {
  static async signIn(data: SignInRequest) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: data.user }, { username: data.user }],
        },
        select: {
          id: true,
          role: true,
          password: true,
        },
      });

      if (!user || !user.password) {
        return { success: false, errors: 'Invalid credentials' };
      }

      const isValidPassword = await comparePassword({
        password: data.password,
        hashedPassword: user.password,
      });

      if (!isValidPassword) {
        return { success: false, errors: 'Invalid credentials' };
      }

      await setSession({ user });

      return { success: true, errors: 'User authenticated' };
    } catch {
      throw new Error('Ups, something went wrong...');
    }
  }

  static async signUp(data: UserCreateInput) {
    try {
      if (data.password !== data.confirmPassword) {
        return { success: false, errors: 'Your password do not match' };
      }

      const hashedPassword = await hashPassword(data.password);

      const usernameExists = await prisma.user.findFirst({
        where: {
          username: data.username,
        },

        select: {
          username: true,
        },
      });

      if (usernameExists) {
        return {
          success: false,
          errors: `${usernameExists.username} already exists`,
        };
      }

      const emailExists = await prisma.user.findFirst({
        where: {
          email: data.email,
        },

        select: {
          email: true,
        },
      });

      if (emailExists) {
        return {
          success: false,
          errors: `${emailExists.email} already exists`,
        };
      }

      const user = await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          fullname: data.fullname,
          password: hashedPassword,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (!user) {
        return { success: false, errors: 'Error creating user' };
      }

      await setSession({ user });

      return { success: true, errors: 'User authenticated and created' };
    } catch {
      throw new Error('Ups, something went wrong...');
    }
  }
}

Auth.signIn = cache(Auth.signIn);
Auth.signUp = cache(Auth.signUp);

export { Auth };
