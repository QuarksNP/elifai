'use client';

import { LogoutBtn } from '@/modules/auth/components/logout-btn';
import { ButtonAsLink } from '@/modules/core/components/button-as-link';
import { Logo } from '@/modules/core/components/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/core/components/ui/accordion';
import { Button } from '@/modules/core/components/ui/button';
import { Icon } from '@/modules/core/components/ui/icon';
import { Separator } from '@/modules/core/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/modules/core/components/ui/sheet';
import { useMediaQuery } from '@/modules/core/hooks/use-media-query';
import { cn } from '@/modules/core/lib/cn';
import { NavigateOptions } from '@/modules/core/types';
import { Profile } from '@/modules/user/components/profile';
import { usePathname } from 'next/navigation';

const NAVIGATION: NavigateOptions[] = [
  {
    name: 'Dashboard',
    href: '/portal',
    icon: 'House',
  },
  {
    name: 'Blog',
    href: '/portal/blog',
    subRoutes: [
      { name: 'Your articles', href: '/portal/blog', icon: 'Newspaper' },
      { name: 'Publish article', href: '/portal/blog/publish', icon: 'Pencil' },
    ],
  },
];

const COLLAPSIBLE_ITEM_CLASSNAME =
  'text-sm text-muted-foreground hover:no-underline hover:text-primary-foreground';

const SideBarContent = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full overflow-y-auto p-4 gap-4 md:h-screen md:border-r md:border-border md:p-8 text-sm text-muted-foreground">
      <Logo className="hidden md:block mb-4" />
      {NAVIGATION.map(({ name, href, icon, subRoutes }, i) => {
        const isActive =
          pathname === href ||
          (href !== '/portal' && pathname.startsWith(`${href}/`));

        if (!subRoutes)
          return (
            <ButtonAsLink
              href={href}
              key={href + i}
              className={cn('self-start gap-2', COLLAPSIBLE_ITEM_CLASSNAME, {
                'text-primary': isActive,
              })}
              variant="link"
              size="none"
            >
              {icon && <Icon name={icon} />}
              {name}
            </ButtonAsLink>
          );

        return (
          <Accordion type="single" collapsible key={href}>
            <AccordionItem value={name} className="border-none">
              <AccordionTrigger
                className={cn(
                  'p-2 w-full justify-between',
                  COLLAPSIBLE_ITEM_CLASSNAME,
                  {
                    'text-primary': pathname.startsWith(href),
                  },
                )}
              >
                <div className="flex items-center gap-2">
                  {icon && <Icon name={icon} className="text-primary" />}
                  <span className="line-clamp-1">{name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-start">
                {subRoutes?.map(({ name, href, icon }, i) => (
                  <ButtonAsLink
                    key={href + i}
                    href={href}
                    variant="link"
                    className={cn(
                      'flex justify-start gap-2',
                      COLLAPSIBLE_ITEM_CLASSNAME,
                      {
                        'text-primary': href === pathname,
                      },
                    )}
                  >
                    {icon && <Icon name={icon} className="h-4 w-4" />}
                    <span className="line-clamp-1">{name}</span>
                  </ButtonAsLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
      <div className="mt-auto space-y-2">
        <Separator orientation="horizontal" className="w-full" />
        <LogoutBtn variant="ghost" className="w-full" />
      </div>
    </aside>
  );
};

export const Navigation = ({ user }: { user?: { fullName: string } }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <SideBarContent />;
  }

  return (
    <header className="flex items-center justify-between gap-4 p-4 md:p-8">
      <Logo href="/" />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="rounded border border-border">
            <Icon name="Menu" size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent className="border-border flex flex-col w-full">
          <SheetHeader>
            <header className="flex flex-col items-center justify-center gap-4 mb-8">
              {user && (
                <Profile withAction={false} user={{ name: user.fullName }} />
              )}
              <h3>Welcome back, What do you want to do today?</h3>
            </header>
          </SheetHeader>
          <SideBarContent />
        </SheetContent>
      </Sheet>
    </header>
  );
};
