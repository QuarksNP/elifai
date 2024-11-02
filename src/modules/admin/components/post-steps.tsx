'use client';

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/modules/core/components/breadcroump";
import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { cn } from "@/modules/core/lib/cn";
import { usePathname } from "next/navigation";

const STEPS = [
    {
        step: "Edit",
        href: "/portal/blog",
    },
    {
        step: "Posts",
        href: "/portal/blog/posts",
    },
    {
        step: "Publish",
        href: "/portal/blog/publish",
    }
]

export const PostSteps = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const pathname = usePathname()

    if (isDesktop) {
        return (
            <aside>
                <Card>
                    <CardContent>
                        <nav className="flex flex-col justify-center gap-4 p-4">
                            {STEPS.map(({ step, href }, i) => (
                                <ButtonAsLink
                                    key={href + i}
                                    href={href}
                                    variant="ghost"
                                    size="default"
                                    className={cn("group flex justify-start w-auto h-auto gap-4 hover:bg-primary/15 hover:text-primary/85 text-muted-foreground", {
                                        "bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary [&>div]:border-primary": pathname === href,
                                    })}
                                >
                                    <div className="rounded-full w-16 h-16 border border-muted-foreground flex justify-center items-center group-hover:border-primary">
                                        <span className="font-bold text-lg">{i + 1}</span>
                                    </div>
                                    <span className="text-lg">{step}</span>
                                </ButtonAsLink>
                            ))}
                        </nav>
                    </CardContent>
                </Card>
            </aside>
        )
    }

    return (
        <header className="flex items-center justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {STEPS.map(({ step, href }, i) => (
                        <BreadcrumbItem key={href + i}>
                            {pathname === href ? (
                                <BreadcrumbPage>{step}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={href}>{step}</BreadcrumbLink>
                            )}
                            {i < STEPS.length - 1 && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
};