import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/core/components/ui/accordion";
import { AccountCard } from "./account-card";

interface DropDownAccountsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accounts: any[];
  name: string;
}

export const DropDownAccounts = ({ accounts, name }: DropDownAccountsProps) => {
  return (
    <AccordionItem value={name}>
      <AccordionTrigger>{name}</AccordionTrigger>
      <AccordionContent>
        {accounts.map((account) => {
          return (
            <AccountCard
              key={account.id}
              title={account.title}
              number={"11111"}
              currentBalance={account.currentBalance}
              totalBalance={account.totalBalance}
              type={account.type}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
