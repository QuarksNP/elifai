import { useState } from 'react';

type Value = string | number | null;

export const useInputChange = () => {
  const [value, setValue] = useState<Value>(null);

  function handleChange(inputValue: Value) {
    setValue(inputValue);
  }

  return { value, handleChange };
};
