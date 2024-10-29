'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/modules/core/components/ui/dialog";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query"
import { TwitterButton, GoogleButton } from "./providers";
import { Separator } from "@/modules/core/components/ui/separator";
import { Button } from "@/modules/core/components/ui/button";
import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/modules/core/components/ui/drawer";
import { SignInForm } from "./sign-in-form";
import { useBasicRouter } from "@/modules/core/hooks/use-basic-router";
import { ScrollArea } from "@/modules/core/components/ui/scroll-area";
import { Logo } from "@/modules/core/components/logo";

export const SignIn = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { handleGoBack } = useBasicRouter();

    if (isDesktop) {
        return (
            <Dialog defaultOpen open onOpenChange={handleGoBack}>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center gap-2 justify-center">
                            <DialogTitle>Sign in to </DialogTitle>
                            <Logo width={75} height={75} />
                        </div>
                    </DialogHeader>
                    <GoogleButton />
                    <TwitterButton />

                    <div className="relative flex flex-col items-center justify-center w-full">
                        <Separator className="absolute w-full" />
                        <span className="relative bg-background px-2">Or</span>
                    </div>

                    <SignInForm />

                    <Button variant="outline" className="my-4">Forgot password?</Button>

                    <DialogFooter>
                        <div className="flex items-center gap-2 mr-auto">
                            <span>Don&apos;t have an account?</span>
                            <ButtonAsLink
                                variant="link"
                                size="none"
                                href="/sign-up"
                                replace
                            >
                                Sign up
                            </ButtonAsLink>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open onOpenChange={handleGoBack}>
            <DrawerContent className="max-h-full">
                <DrawerHeader>
                    <DrawerTitle>Sign in to Elifai</DrawerTitle>
                </DrawerHeader>

                <ScrollArea className="overflow-auto">
                    <div className="w-full flex flex-col gap-4">
                        <GoogleButton />
                        <TwitterButton />

                        <div className="relative flex flex-col items-center justify-center w-full">
                            <Separator className="absolute w-full" />
                            <span className="relative bg-background px-2">Or</span>
                        </div>

                        <SignInForm />

                        <Button variant="outline" className="my-4">Forgot password?</Button>
                    </div>
                </ScrollArea>

                <DrawerFooter>
                    <div className="flex items-center gap-2 mr-auto">
                        <span>Don&apos;t have an account?</span>
                        <ButtonAsLink
                            variant="link"
                            size="none"
                            href="/sign-up"
                            replace
                        >
                            Sign up
                        </ButtonAsLink>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}