import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import type { AccountCreateInput } from '../types';
import { Separator } from '@/modules/core/components/ui/separator';
import { Icon } from '@/modules/core/components/ui/icon';

interface AccountCardProps
  extends Pick<
    AccountCreateInput,
    'title' | 'number' | 'currentBalance' | 'totalBalance' | 'type'
  > {
  n?: number;
}

export const AccountCard = ({
  title,
  number,
  currentBalance,
  totalBalance,
  type,
}: AccountCardProps) => {
  const renderIcon = () => {
    switch (type) {
      case 'CREDIT_CARD':
        return <Icon name="CreditCard" className="text-primary" size={36} />;
      case 'INVESTMENT':
        return <Icon name="DollarSign" className="text-primary" size={36} />;
      case 'SAVINGS':
        return <Icon name="PiggyBank" className="text-primary" size={36} />;
      default:
        return <div />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {renderIcon()}
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-primary">{number}</CardDescription>
        </div>
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
        <Separator orientation="horizontal" className="grow" />
      </CardContent>
      <CardFooter>
        <span className="text-sm text-muted-foreground">Recent Activity</span>
      </CardFooter>
    </Card>
  );
};
