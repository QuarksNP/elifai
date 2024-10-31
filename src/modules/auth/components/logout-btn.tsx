'use client';

import { Button, type ButtonProps } from "@/modules/core/components/ui/button";
import { useLogout } from "../hooks/use-logout";
import { ButtonLoading } from "@/modules/core/components/button-loading";

interface LogoutBtnProps extends ButtonProps {
    className?: string;
}

export const LogoutBtn = ({ className, ...props }: LogoutBtnProps) => {
    const { handleLogout, isLoading } = useLogout();

    return (
        <>
            {isLoading
                ? (
                    <ButtonLoading variant="destructive" className={className} {...props}/>
                ) 
                : (
                    <Button 
                        variant="destructive" 
                        onClick={handleLogout}
                        className={className}
                        {...props}
                    >
                        Logout
                    </Button>
                )}
        </>
    )
};