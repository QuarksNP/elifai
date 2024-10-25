'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/modules/core/components/ui/dialog";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query"
import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/modules/core/components/ui/drawer";
import { useBasicRouter } from "@/modules/core/hooks/use-basic-router";
import { ScrollArea } from "@/modules/core/components/ui/scroll-area";
import { Logo } from "@/modules/core/components/logo";
import { SignUpForm } from "./sign-up-form";

export const SignUp = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { handleGoBack } = useBasicRouter();

    if (isDesktop) {
        return (
            <Dialog open onOpenChange={handleGoBack}>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center gap-2 justify-center">
                            <DialogTitle>Sign up on</DialogTitle>
                            <Logo width={75} height={75} />
                        </div>
                    </DialogHeader>

                    <SignUpForm />

                    <DialogFooter>
                        <div className="flex items-center gap-2 mr-auto">
                            <span>Do you already have an account?</span>
                            <ButtonAsLink
                                variant="link"
                                size="none"
                                href="/sign-in"
                                replace
                            >
                                Sign in
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
                    <div className="flex items-center gap-2 justify-center">
                        <DrawerTitle>Sign up on</DrawerTitle>
                        <Logo width={75} height={75} />
                    </div>
                </DrawerHeader>

                <ScrollArea className="overflow-auto">
                    <div className="w-full flex flex-col gap-4">
                        <SignUpForm />
                    </div>
                </ScrollArea>

                <DrawerFooter>
                    <div className="flex items-center gap-2 mr-auto">
                        <span>Do you already have an account?</span>
                        <ButtonAsLink
                            variant="link"
                            size="none"
                            href="/sign-in"
                            replace
                        >
                            Sign in
                        </ButtonAsLink>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}