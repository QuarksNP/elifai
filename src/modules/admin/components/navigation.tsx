'use client';

import { LogoutBtn } from "@/modules/auth/components/logout-btn";
import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Logo } from "@/modules/core/components/logo";
import { Button } from "@/modules/core/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/modules/core/components/ui/collapsible";
import { Icon } from "@/modules/core/components/ui/icon";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/modules/core/components/ui/sheet";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { useOpenCollapsibles } from "@/modules/core/hooks/use-open-collapsibles";
import { cn } from "@/modules/core/lib/cn";
import { NavigateOptions } from "@/modules/core/types";
import { Profile } from "@/modules/user/components/profile";
import { usePathname } from "next/navigation";

const NAVIGATION: NavigateOptions[] = [
    {
        name: "Dashboard",
        href: "/portal",
        icon: "House"
    },
    {
        name: "Blog",
        href: "/portal/blog",
        subRoutes: [
            { name: "Your articles", href: "/portal/blog", icon: "Newspaper" },
            { name: "Publish article", href: "/portal/blog/publish", icon: "Pencil" },
        ]
    },
];

const COLLAPSIBLE_ITEM_CLASSNAME = "text-sm text-muted-foreground hover:no-underline hover:text-primary-foreground"

const SideBarContent = () => {
    const pathname = usePathname()
    const { isOpen, handleToggle } = useOpenCollapsibles()

    return (
        <aside className="flex flex-col h-full overflow-y-auto p-4 gap-8 md:h-screen md:border-r md:border-border md:p-8 text-sm text-muted-foreground">
            {NAVIGATION.map(({ name, href, icon, subRoutes }, i) => {
                if (!subRoutes) return (
                    <ButtonAsLink
                        href={href}
                        key={href + i}
                        className={cn("justify-start gap-2", COLLAPSIBLE_ITEM_CLASSNAME,{
                            "text-primary": href === pathname,
                        })}
                        variant="link"
                        size="none"
                    >
                        {icon && <Icon name={icon} />}
                        {name}
                    </ButtonAsLink>
                )

                return (
                    <Collapsible key={href} open={!!isOpen[name]} onOpenChange={() => handleToggle(name)}>
                            <CollapsibleTrigger asChild>
                                <ButtonAsLink
                                    href={subRoutes[0].href}
                                    variant="link"
                                    size="none"
                                    className={cn("p-2 w-full justify-between", COLLAPSIBLE_ITEM_CLASSNAME,{
                                        "text-primary": pathname.startsWith(href),
                                    })}
                                >
                                    <div className="flex items-center gap-2">
                                        {icon && <Icon name={icon} className="text-primary" />}
                                        <span className="line-clamp-1">{name}</span>
                                    </div>

                                    {isOpen[name]
                                        ? <Icon name="ChevronDown" size={16} />
                                        : <Icon name="ChevronRight" size={16} />
                                    }
                                </ButtonAsLink>
                            </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 text-sm text-muted-foreground grow flex-col mt-6">
                            {subRoutes?.map(({ name, href, icon }, i) => (
                                <ButtonAsLink
                                    key={href + i}
                                    href={href}
                                    variant="link"
                                    className={cn("flex justify-start gap-2", COLLAPSIBLE_ITEM_CLASSNAME, {
                                        "text-primary": href === pathname,
                                    })}
                                >
                                    {icon && <Icon name={icon} className="h-4 w-4" />}
                                    <span className="line-clamp-1">{name}</span>
                                </ButtonAsLink>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                )
            })}
        </aside>
    )
}

export const Navigation = ({ user }: { user?: { fullName: string } }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <SideBarContent />
        )
    }

    return (
        <header className="flex items-center justify-between gap-4 p-4 md:p-8">
            <Logo href="/" />
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="rounded border border-border"
                    >
                        <Icon name="Menu" size={24} />
                    </Button>
                </SheetTrigger>
                <SheetContent className="border-border flex flex-col">
                    <SheetHeader>
                        <header className="flex flex-col items-center justify-center gap-4 mb-8">
                            {user && <Profile
                                withAction={false}
                                user={{ name: user.fullName }}
                            />}
                            <h3>Welcome back, What do you want to do today?</h3>
                        </header>
                    </SheetHeader>
                    <SideBarContent />
                    <SheetFooter className="mt-auto">
                        <LogoutBtn />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </header>
    )
};