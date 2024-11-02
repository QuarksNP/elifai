import { useEffect, useState } from "react";

import { type Editor } from "@tiptap/react";

export type Values = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const useChangeText = (editor?: Editor | null) => {
  const [value, setValue] = useState<Values | undefined>(undefined);

  useEffect(() => {
    if (!value || !editor) {
      return;
    }

    if (value === "p") {
      editor.commands.setParagraph();
    }

    if (value === "h1") {
      editor.commands.setHeading({ level: 1 });
    } else if (value === "h2") {
      editor.commands.setHeading({ level: 2 });
    } else if (value === "h3") {
      editor.commands.setHeading({ level: 3 });
    } else if (value === "h4") {
      editor.commands.setHeading({ level: 4 });
    } else if (value === "h5") {
      editor.commands.setHeading({ level: 5 });
    } else if (value === "h6") {
      editor.commands.setHeading({ level: 6 });
    }
  }, [value]);

  function handleChange(value: Values) {
    setValue(value);
  }

  return { value, handleChange };
};
