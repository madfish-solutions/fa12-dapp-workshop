import { useState, useEffect } from "react";

export const usePendingPromise = <T extends unknown>(
  fetcher: () => Promise<T>,
  transformer?: (result: T) => any
) => {
  const [fetching, setFetching] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [data, setStorage] = useState<string>();

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      try {
        setFetching(true);
        setError(undefined);

        const result = await fetcher();
        !isUnmounted && setStorage(transformer ? transformer(result) : result);
      } catch (e) {
        !isUnmounted &&
          setError(
            "Something went wrong while fetching storage: " + e.toString()
          );
      } finally {
        !isUnmounted && setFetching(false);
      }
    })();

    return () => {
      isUnmounted = true;
    };
  }, [fetcher, transformer]);

  return { fetching, error, data };
};
