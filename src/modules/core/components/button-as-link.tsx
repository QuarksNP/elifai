import Link from "next/link"
import { Button, ButtonProps } from "./ui/button"

interface LinkAsButton extends ButtonProps {
    href: string
    replace?: boolean
}

export const ButtonAsLink = ({ href = "", replace, children, ...props }: LinkAsButton) => {
    return (
        <Button {...props} asChild>
            <Link href={href} replace={replace}>
                {children}
            </Link>
        </Button>
    )
}