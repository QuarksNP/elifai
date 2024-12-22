import { useState } from 'react';

type ElementType = 'button' | 'div';

type ElementEventMap = {
  button: React.MouseEvent<HTMLButtonElement>;
  div: React.MouseEvent<HTMLDivElement>;
};

export const useClick = <T extends ElementType>(initialState = false) => {
  const [change, setChange] = useState(initialState);

  function handleClick(e?: ElementEventMap[T]) {
    e?.preventDefault();
    setChange((prev) => !prev);
  }

  return [change, handleClick] as const;
};
