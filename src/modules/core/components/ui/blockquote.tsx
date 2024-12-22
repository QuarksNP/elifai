import { cn } from '../../lib/cn';

type Title =
  | 'Good to know'
  | 'Tip'
  | 'Note'
  | 'Warning'
  | 'Danger'
  | 'Info'
  | 'Requirements';

interface BlockquoteProps extends React.HTMLAttributes<HTMLElement> {
  title?: Title;
  children: React.ReactNode;
}

export const Blockquote = ({
  children,
  className,
  title,
  ...props
}: BlockquoteProps) => {
  return (
    <blockquote
      className={cn(
        'text-sm border border-border p-2 space-y-4 rounded',
        className,
      )}
      {...props}
    >
      {title && (
        <span className="font-bold text-primary-foreground">{title}:</span>
      )}

      {children}
    </blockquote>
  );
};
