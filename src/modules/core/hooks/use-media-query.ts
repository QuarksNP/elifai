import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const documentMatchQuery = (e: MediaQueryListEvent) =>
      void setMatches(e.matches);

    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentMatchQuery);

    return () =>
      void mediaQueryList.removeEventListener("change", documentMatchQuery);
  }, [query]);

  return matches;
};
