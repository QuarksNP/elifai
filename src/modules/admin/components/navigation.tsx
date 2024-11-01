'use client';

import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Icon, type IconName } from "@/modules/core/components/ui/icon";
import { cn } from "@/modules/core/lib/cn";
import { usePathname } from "next/navigation";

const NAVIGATION: { name: string; href: string, icon?: IconName }[] = [
    { name: "Dashboard", href: "/portal", icon: "House" },
    { name: "Blog", href: "/portal/blog", icon: "Newspaper" },
];

export const Navigation = () => {
    const pathname = usePathname()

    return (
        <nav className="flex flex-row fixed bottom-0 border-t border-muted w-full py-4 px-8 justify-between gap-2 left-0 md:relative md:border-none md:p-0 md:justify-normal md:bottom-auto md:w-auto">
            {NAVIGATION.map(({ name, href, icon }, i) => (
                <ButtonAsLink
                    key={href + i}
                    href={href}
                    variant="ghost"
                    className={cn("hover:bg-primary/15 hover:text-primary/85 text-muted-foreground", {
                        "bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary": pathname === href,
                    })}
                >
                    {icon && <Icon name={icon} />}
                    <span className="ml-2 hidden lg:block md:text-sm">{name}</span>
                </ButtonAsLink>
            ))}
        </nav>
    )
}