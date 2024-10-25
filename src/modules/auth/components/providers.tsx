import { Button } from "@/modules/core/components/ui/button"

import google_icon from "@/modules/core/assets/svgs/google.svg"
import apple_icon from "@/modules/core/assets/svgs/apple.svg"
import Image from "next/image"

const ButtonWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode,
    className?: string,
}) => {
    return (
        <Button variant="secondary" className={className}>
            {children}
        </Button>
    )
}

export const GoogleButton = ({ className }: { className?: string }) => {
    return (
        <ButtonWrapper className={className}>
            <Image 
                src={google_icon}
                alt="google-icon"
                width={30}
                height={30}
                className="mr-2"
            /> Continue with Google
        </ButtonWrapper>
    )
}

export const AppleButton = ({ className }: { className?: string }) => {
    return (
        <ButtonWrapper className={className}>
            <Image 
                src={apple_icon}
                alt="apple-icon"
                width={24}
                height={24}
                className="mr-2"
            /> Continue with Apple
        </ButtonWrapper>
    )
}