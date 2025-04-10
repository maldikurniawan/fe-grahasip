// eslint-disable-next-line @typescript-eslint/no-explicit-any
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/react-query";

export const logout = () => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
    }
};

export const useGetData = (
    endpoint: string,
    queryKey: QueryKey,
    withToken = false,
    params: Record<string, string> = {},
    options: object = {}
) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const headers: Record<string, string> = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.get(endpoint, {
                params,
                headers,
            });
            return response.data;
        },
        throwOnError: (error: unknown) => {
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 401
            ) {
                logout();
            }
            return false;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        ...options,
    });
};

export const usePostData = (endpoint: string, withToken = false) => {
    return useMutation({
        mutationFn: async (data: any) => {
            const headers: Record<string, string> = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.post(endpoint, data, {
                headers,
            });

            return response.data;
        },
        throwOnError: (error: unknown) => {
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 401
            ) {
                logout();
            }
            return false;
        },
    });
};

export const usePutData = (endpoint: string, withToken = false) => {
    return useMutation({
        mutationFn: async (data: any) => {
            const headers: Record<string, string> = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.put(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error: unknown) => {
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 401
            ) {
                logout();
            }
            return false;
        },
    });
};

export const useDeleteData = (endpoint: string, withToken = false) => {
    return useMutation({
        mutationFn: async (id) => {
            const headers: Record<string, string> = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.delete(`${endpoint}${id}/`, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error: unknown) => {
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 401
            ) {
                logout();
            }
            return false;
        },
    });
};