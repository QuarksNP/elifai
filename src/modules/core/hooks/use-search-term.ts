import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useSearchTerm = ({
  defaultValue,
  param,
}: {
  defaultValue: string;
  param: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [currentTerm, setCurrentTerm] = useState<string | undefined>(() => {
    const params = new URLSearchParams(searchParams);

    if (params.has(param)) {
      return params.get(param)?.toString();
    }

    return defaultValue ?? undefined;
  });

  function onChange(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(param, term);
      setCurrentTerm(term);
    } else {
      params.delete(param);
      setCurrentTerm(undefined);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return [currentTerm, onChange] as const;
};
