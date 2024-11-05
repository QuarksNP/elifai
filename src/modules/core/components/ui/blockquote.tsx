import { cn } from "../../lib/cn"

export const Blockquote = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <blockquote className={cn("border-l-2 border-muted-foreground pl-4 text-sm bg-muted-foreground/20 p-2", className)}>
            <p>
                {children}
            </p>
        </blockquote>
    );
}