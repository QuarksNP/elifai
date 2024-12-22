'use client';

import { Button, type ButtonProps } from '@/modules/core/components/ui/button';
import { useLogout } from '../hooks/use-logout';
import { ButtonLoading } from '@/modules/core/components/button-loading';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/modules/core/components/ui/alert-dialog';
import { Icon } from '@/modules/core/components/ui/icon';

interface LogoutBtnProps extends ButtonProps {
  className?: string;
}

export const LogoutBtn = ({ className, ...props }: LogoutBtnProps) => {
  const { handleLogout, isLoading } = useLogout();

  return (
    <>
      {isLoading ? (
        <ButtonLoading variant="destructive" className={className} {...props} />
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className={className} {...props}>
              <Icon name="LogOut" size={20} className="mr-2" /> Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will need to log in to your account again to access the
                platform
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="button" onClick={handleLogout}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
