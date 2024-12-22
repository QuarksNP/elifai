import { authorization } from '@/modules/auth/lib/decorators';
import prisma from '@/modules/core/lib/prisma';
import { AccountType, Prisma } from '@prisma/client';
import { CreditCardDTO, InvestmentDTO, SavingsDTO } from './dtos';
import { AuthError } from '@/modules/auth/errors/auth_error';
import { cache } from 'react';

class Account {
  @authorization('USER')
  static async getAccountsByType(userId: string, type: AccountType) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new AuthError("You don't have permission to get accounts", 401);
      }

      const mapDTOs = {
        CREDIT_CARD: CreditCardDTO,
        INVESTMENT: InvestmentDTO,
        SAVINGS: SavingsDTO,
        CUSTOM: () => null,
      };

      const accounts = await prisma.account
        .findMany({
          where: {
            type,
            userId,
          },
        })
        .then((accounts) => accounts.map((account) => mapDTOs[type](account)));

      if (!accounts) {
        throw new Error('Ups, something went wrong...');
      }

      return { success: true, errors: null, data: accounts };
    } catch (error) {
      if (
        error instanceof Error ||
        error instanceof AuthError ||
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      }
      throw new Error('Ups, something went wrong...');
    }
  }

  @authorization('USER')
  static async createAccount(userId: string, data: Prisma.AccountCreateInput) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new AuthError(
          "You don't have permission to create an account",
          401,
        );
      }

      const account = await prisma.account.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!account) {
        throw new Error('Ups, something went wrong...');
      }

      return {
        success: true,
        errors: null,
        data: account,
      };
    } catch (error) {
      if (
        error instanceof Error ||
        error instanceof AuthError ||
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        return {
          success: false,
          errors: error.message,
          data: null,
        };
      }
      throw new Error('Ups, something went wrong...');
    }
  }
}

Account.getAccountsByType = cache(Account.getAccountsByType);

export { Account };
