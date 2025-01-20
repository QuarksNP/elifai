import { useState } from 'react';

type Value = string | number | readonly string[] | undefined;

export const useInputChange = (initialState: Value = undefined) => {
  const [value, setValue] = useState<Value>(initialState);

  function handleChange(inputValue: Value) {
    setValue(inputValue);
  }

  return { value, handleChange };
};
