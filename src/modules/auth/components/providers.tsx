'use client';

import { Button } from "@/modules/core/components/ui/button"

import google_icon from "@/modules/core/assets/svgs/google.svg"
import apple_icon from "@/modules/core/assets/svgs/apple.svg"
import Image from "next/image"
import { useGoogle } from "../hooks/use-google"

const ButtonWrapper = ({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode,
    className?: string,
    onClick: () => void,
}) => {
    return (
        <Button variant="secondary" className={className} onClick={onClick}>
            {children}
        </Button>
    )
}

export const GoogleButton = ({ className }: { className?: string }) => {
    const { handleGoogleSignIn } = useGoogle()

    return (
        <ButtonWrapper className={className} onClick={async () => await handleGoogleSignIn()}>
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
        <ButtonWrapper className={className} onClick={() => void {}}>
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