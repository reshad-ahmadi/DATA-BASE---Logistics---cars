import { useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    setError(null);
    return fetcher()
      .then((result) => {
        setData(result);
        return result;
      })
      .catch((err: Error) => {
        setError(err.message || "Request failed");
        throw err;
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;

    fetcher()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: Error) => {
        if (active) setError(err.message || "Request failed");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, reload, setData };
}
