import { useState, useCallback, useEffect } from 'react';

export function useModelState(defaultVal = false) {
  const [isOpen, setIsopen] = useState(defaultVal);

  const open = useCallback(() => setIsopen(true), []);
  const close = useCallback(() => setIsopen(false), []);

  return { isOpen, open, close };
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);
    const listener = event => setMatches(event.matches);
    queryList.addListener(listener);

    return () => queryList.removeListener(listener);
  }, [query]);
  return matches;
}
