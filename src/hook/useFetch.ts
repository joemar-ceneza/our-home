import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { request } from "../request";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: AxiosError | null;
}

export default function useFetch<T = unknown>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // reset state so a new url never shows the previous url's data/error
    setIsLoading(true);
    setError(null);

    const fetchData = async (): Promise<void> => {
      try {
        const res = await request.get<T>(url, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        // ignore the error thrown by an aborted (superseded) request
        if (axiosError.code !== "ERR_CANCELED" && axiosError.name !== "CanceledError") {
          setError(axiosError);
        }
      } finally {
        // only the request that wasn't aborted flips loading off
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
