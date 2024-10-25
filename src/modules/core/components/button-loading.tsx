import { Loader } from "lucide-react"

import { Button } from "./ui/button";

import { cn } from "../lib/cn";

interface ButtonLoadingProps extends React.ComponentProps<typeof Button> {
    className?: string;
    text?: string;
}

export function ButtonLoading({ text, ...props }: ButtonLoadingProps) {
    return (
        <Button disabled className={props.className} {...props}>
            <Loader className={cn("h-4 w-4 animate-spin", {
                "mr-2": text,
            })}
            />
            {text}
        </Button>
    )
}