import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export default function useApi<T>(
  url: string,
  method: AxiosRequestConfig["method"] = "GET",
  body?: any
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config: AxiosRequestConfig = {
          url,
          method,
        };
        if (body) {
          config.data = body;
        }

        const response: AxiosResponse<T> = await axiosInstance(config);
        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as string) ||
            (axiosError.message as string)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, body]);

  return { loading, data, error };
}
