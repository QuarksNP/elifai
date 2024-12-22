import { useState } from 'react';

export const useOpenCollapsibles = () => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  function handleToggle(key: string) {
    setIsOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return {
    isOpen,
    handleToggle,
  };
};
