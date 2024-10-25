'use client';

import { Button } from "@/modules/core/components/ui/button";
import { useLogout } from "../hooks/use-logout";
import { ButtonLoading } from "@/modules/core/components/button-loading";

export const LogoutBtn = () => {
    const { handleLogout, isLoading } = useLogout();

    return (
        <>
            {isLoading
                ? (
                    <ButtonLoading variant="destructive" />
                ) 
                : (
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                )}
        </>
    )
};