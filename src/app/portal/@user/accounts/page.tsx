import { Accordion } from '@/modules/core/components/ui/accordion';
import { getAccountsByType } from '@/modules/user/accounts/actions/get-accounts-by-type';
import { AccountTypes } from '@/modules/user/accounts/components/create-account-steps/account-types';
import { DropDownAccounts } from '@/modules/user/accounts/components/drop-down-accounts';

export default async function Page() {
  const [, , savings] = await Promise.all([
    getAccountsByType('CREDIT_CARD'),
    getAccountsByType('INVESTMENT'),
    getAccountsByType('SAVINGS'),
  ]);

  return (
    <section className="p-4 space-y-16 md:p-8">
      <header>
        <h1>My Accounts</h1>
        <button>Add Account</button>
      </header>
      <AccountTypes />
      <Accordion
        type="multiple"
        className="space-y-8"
        defaultValue={['Credit Cards', 'Investments', 'Savings']}
      >
        <DropDownAccounts accounts={savings} name="Credit Cards" />
        <DropDownAccounts accounts={savings} name="Investments" />
        <DropDownAccounts accounts={savings} name="Savings" />
      </Accordion>
    </section>
  );
}
