import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    // Update the state with the current value
    setMatches(mediaQuery.matches);
    // Create an event listener
    const handler = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setMatches(event.matches);
    // Attach the event listener to know when the matches value changes
    mediaQuery.addEventListener("change", handler);
    // Remove the event listener on cleanup
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
