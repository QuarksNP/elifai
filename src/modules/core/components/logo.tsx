import Image from "next/image";

import logo from "@/modules/core/assets/svgs/logo.svg";
import { cn } from "../lib/cn";

interface LogoProps {
    width?: number,
    height?: number,
    className?: string,
};

export const Logo = ({
    width = 100,
    height = 100,
    className,
}: LogoProps) => {
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