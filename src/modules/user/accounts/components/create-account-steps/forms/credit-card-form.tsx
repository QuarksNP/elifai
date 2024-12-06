import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/modules/core/components/ui/form";
import { useCreateCreditCardAccount } from "../../../hooks/use-create-credit-card-account";
import { Input } from "@/modules/core/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/core/components/ui/dialog";
import { Button } from "@/modules/core/components/ui/button";
import { Icon } from "@/modules/core/components/ui/icon";

const CreditCardForm = () => {
  const { form } = useCreateCreditCardAccount();
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Account Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Card Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="securityCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="CVV - Security Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export const CreditCardDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-col gap-2 h-fit w-fit">
          <Icon name="CreditCard" className="text-primary" />
          Credit Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Credit Card</DialogTitle>
            <DialogDescription>Add a new credit card</DialogDescription>
        </DialogHeader>
        <CreditCardForm />
      </DialogContent>
    </Dialog>
  );
};
