import { AccountStatus, AccountType, RISK_PROFILE } from "@prisma/client";
import { z } from "zod";

import type { AccountCreateInput } from "../types";

export const CreditCardSchema = z.object({
  number: z.string(),
  title: z.string(),
  provider: z.string(),
  currentBalance: z.number(),
  totalBalance: z.number(),
  expiresAt: z.date(),
  openingDate: z.date(),
  securityCode: z.number(),
  type: z.nativeEnum(AccountType),
  status: z.nativeEnum(AccountStatus).optional(),
  metadata: z.string().optional(),
  associatedAccountId: z.string().uuid().optional(),
}) satisfies z.ZodType<AccountCreateInput>;

export const InvestmentSchema = z.object({
  number: z.string(),
  title: z.string(),
  provider: z.string(),
  totalBalance: z.number(),
  openingDate: z.date(),
  securityCode: z.number(),
  returns: z.number(),
  assetAllocation: z.string(),
  type: z.nativeEnum(AccountType),
  riskProfile: z.nativeEnum(RISK_PROFILE).optional(),
  status: z.nativeEnum(AccountStatus).optional(),
  metadata: z.string().optional(),
  associatedAccountId: z.string().uuid().optional(),
}) satisfies z.ZodType<AccountCreateInput>;

export const SavingsSchema = z.object({
  number: z.string(),
  title: z.string(),
  provider: z.string(),
  totalBalance: z.number(),
  openingDate: z.date(),
  securityCode: z.number(),
  type: z.nativeEnum(AccountType),
  status: z.nativeEnum(AccountStatus).optional(),
  metadata: z.string().optional(),
  associatedAccountId: z.string().uuid().optional(),
}) satisfies z.ZodType<AccountCreateInput>;
