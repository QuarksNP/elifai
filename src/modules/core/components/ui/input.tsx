'use client'

import * as React from "react"

import { cn } from "../../lib/cn"
import { icons } from "lucide-react"
import { Label } from "./label"
import { Icon } from "./icon"
import { useClick } from "../../hooks/use-click"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: keyof typeof icons
    password?: boolean
    containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, type, password, containerClassName, children, ...props }, ref) => {

        const [show, onClick] = useClick(true);

        return (
            <Label className={cn(
                "flex items-center h-9 w-full rounded border border-border bg-card text-sm shadow-sm transition-colors has-[:focus]:border-primary", containerClassName, {
                "pl-3": icon,
                "pr-3": password,
            }
            )}>
                {icon && <Icon name={icon} />}
                <input
                    type={(show && password) ? "password" : type}
                    className={cn(
                        "flex px-3 bg-transparent py-1 h-full placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:none disabled:cursor-not-allowed disabled:opacity-50 w-full",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {password && (
                    <button
                        type="button"
                        onClick={onClick}
                    >
                        <Icon 
                            name={show ? "EyeOff" : "Eye"}
                            className={cn("text-primary", {
                                "text-muted-foreground": show
                            })}
                        />
                    </button>
                )}
                {children}
            </Label>
        )

    }
)
Input.displayName = "Input";

export { Input }
