import { Role } from '@prisma/client';
import { _verifySession } from './dal';
import prisma from '@/modules/core/lib/prisma';
import { AuthError } from '../errors/auth_error';

export function authorization(role: Role) {
  return (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const {
        isAuthenticated,
        user: { id },
      } = await _verifySession();

      if (!isAuthenticated || !id) {
        throw new AuthError('Unauthorized, cannot execute', 403);
      }

      try {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
          select: {
            role: true,
          },
        });

        if (!user) {
          throw new AuthError('Unauthorized, cannot execute', 404);
        }

        if (user.role !== role) {
          throw new AuthError(
            'Unauthorized, you do not have the required permissions',
            403,
          );
        }

        return originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof AuthError) {
          throw error;
        }
        throw new AuthError('Ups, something went wrong...', 500);
      }
    };
  };
}
