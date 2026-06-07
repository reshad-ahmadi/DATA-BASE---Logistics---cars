import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
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
  }, deps);

  useEffect(() => {
    reload().catch(() => undefined);
  }, [reload]);

  return { data, loading, error, reload, setData };
}
