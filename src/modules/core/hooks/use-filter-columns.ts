import { useState } from "react";

export const useFilterColumns = (initialState: string[]) => {
  const [currentColumns, setCurrentColumns] = useState<string[]>(initialState);

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    const form = e.currentTarget;

    const fields = Object.fromEntries(new FormData(form).entries());

    setCurrentColumns(
      Object.keys(fields).filter((key) => fields[key] === "on")
    );
  }

  return {
    currentColumns,
    handleChange,
  };
};
