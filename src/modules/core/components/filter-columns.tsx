import { cn } from '../lib/cn';
import { Button, buttonVariants } from './ui/button';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface FilterColumnsProps {
  columns: string[];
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

export const FilterColumns = ({ columns, onChange }: FilterColumnsProps) => {
  if (!columns?.length) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Columns</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <form onChange={onChange} className="flex flex-col gap-2">
          {columns.map((column, i) => (
            <Label
              key={column + i}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'justify-start gap-2',
              )}
            >
              <input type="checkbox" name={column} defaultChecked /> {column}
            </Label>
          ))}
        </form>
      </PopoverContent>
    </Popover>
  );
};
