'use client'

import { useSignIn } from "../hooks/use-sign-in";

import { Input } from "@/modules/core/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/modules/core/components/ui/form";
import { Button } from "@/modules/core/components/ui/button";
import { ButtonLoading } from "@/modules/core/components/button-loading";

export const SignInForm = () => {
    const { form, onSubmit } = useSignIn();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    icon="User"
                                    placeholder="Email or username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    password
                                    icon="Lock"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.formState.isSubmitting
                    ? (
                        <ButtonLoading className="w-full" />
                    )
                    : (
                        <Button className="w-full">Sign in</Button>
                    )}
            </form>
        </Form>
    )
}