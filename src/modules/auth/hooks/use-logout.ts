import { useState } from 'react';
import { logout } from '../actions/logout';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    await logout();

    setIsLoading(false);
  };

  return {
    handleLogout,
    isLoading,
  };
};
