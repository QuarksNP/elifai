import { LogoutBtn } from '@/modules/auth/components/logout-btn';
import { Avatar, AvatarFallback } from '@/modules/core/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/core/components/ui/popover';
import { cn } from '@/modules/core/lib/cn';

interface ProfileProps {
  user: {
    name: string;
  };
  withAction?: boolean;
  className?: string;
}

export const Profile = ({
  user,
  className,
  withAction = true,
}: ProfileProps) => {
  if (withAction) {
    return (
      <div className={className}>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="space-y-4 text-center">
            <span className="text-muted-foreground">{user.name}</span>
            <LogoutBtn className="w-full" />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <Avatar>
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-muted-foreground">{user.name}</span>
    </div>
  );
};
