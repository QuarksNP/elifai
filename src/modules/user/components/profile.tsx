import { LogoutBtn } from "@/modules/auth/components/logout-btn";
import { Avatar, AvatarFallback } from "@/modules/core/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/modules/core/components/ui/popover"

interface ProfileProps {
    user: {
        name: string;
    };
    className?: string;
};

export const Profile = ({ user, className }: ProfileProps) => {
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
    )
}