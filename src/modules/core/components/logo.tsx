import Image from "next/image";

import logo from "@/modules/core/assets/svgs/logo.svg";
import { cn } from "../lib/cn";
import Link from "next/link";

interface LogoProps {
    width?: number,
    height?: number,
    className?: string,
    href?: string,
    containerClassName?: string,
};

export const Logo = ({
    width = 100,
    height = 100,
    href,
    containerClassName,
    className,
}: LogoProps) => {
    if (href) {
        return (
            <Link href={href} className={containerClassName}>
                <Image
                    src={logo}
                    alt="logo"
                    width={width}
                    height={height}
                    className={className}
                />
            </Link>
        );
    }

    return (
        <Image
            src={logo}
            alt="logo"
            width={width}
            height={height}
            className={cn("object-contain", className)}
        />
    )
};