import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/modules/core/components/ui/form";
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
import { useCreateSavingsAccount } from "../../../hooks/use-create-savings-account";
  
  const SavingsForm = () => {
    const { form } = useCreateSavingsAccount();
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
  
  export const SavingsDialog = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex flex-col gap-2 h-fit w-fit">
            <Icon name="PiggyBank" className="text-primary" />
            Savings Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
              <DialogTitle>Savings Account</DialogTitle>
              <DialogDescription>Add a new Savings Account</DialogDescription>
          </DialogHeader>
          <SavingsForm />
        </DialogContent>
      </Dialog>
    );
  };
  