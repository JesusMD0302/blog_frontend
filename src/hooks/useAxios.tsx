import axios, { AxiosInstance } from "axios";
import { useSession } from "next-auth/react";
import { use, useEffect, useRef } from "react";

export default function useAxios() {
  const { data } = useSession();

  const axiosInstanceRef = useRef<AxiosInstance>(
    axios.create({
      baseURL: "http://localhost:3000/api",
    })
  );

  useEffect(() => {
    const axiosInstance = axiosInstanceRef.current;

    // Interceptor to add Authorization header
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if ((data as any)?.accessToken) {
          config.headers.Authorization = `Bearer ${(data as any).accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [data]);

  useEffect(() => {
    const axiosInstance = axiosInstanceRef.current;

    return () => {
      axiosInstance.interceptors.request.clear();
    };
  }, []);

  return axiosInstanceRef.current;
}
