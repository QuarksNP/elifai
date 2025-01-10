import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import type { AccountCreateInput } from '../types';
import { Icon, type IconName } from '@/modules/core/components/ui/icon';

interface AccountCardProps
  extends Pick<
    AccountCreateInput,
    'title' | 'number' | 'currentBalance' | 'totalBalance' | 'type'
  > {}

export const AccountCard = ({
  title,
  number,
  currentBalance,
  totalBalance,
  type,
}: AccountCardProps) => {
  const getIconName = (): IconName | null => {
    switch (type) {
      case 'CREDIT_CARD':
        return 'CreditCard';
      case 'INVESTMENT':
        return 'HandCoins';
      case 'SAVINGS':
        return 'Landmark';
      default:
        return null;
    }
  };

  const iconName = getIconName();

  return (
    <Card className="relative flex flex-col justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-primary">{number}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentBalance && (
          <div>
            <span className="text-sm text-muted-foreground">
              Current Balance
            </span>
            <h2 className="font-bold">
              {currentBalance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </h2>
          </div>
        )}
        <div>
          <span className="text-sm text-muted-foreground">Total Balance</span>
          <h2 className="font-bold">
            {totalBalance.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </h2>
        </div>
      </CardContent>
      {iconName && (
        <Icon
          name={iconName}
          className="hidden sm:block sm:absolute sm:right-0 sm:size-48 sm:translate-x-10 sm:-scale-x-100 sm:opacity-20 sm:stroke-[1.3]"
        />
      )}
    </Card>
  );
};
