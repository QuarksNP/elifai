export const Blockquote = ({ children }: { children: React.ReactNode }) => {
    return (
        <blockquote className="border-l-2 border-muted-foreground pl-4 text-sm bg-muted-foreground/20 p-2">
            <p>
                {children}
            </p>
        </blockquote>
    );
}