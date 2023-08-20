import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: 500,
        },
    },
    queryCache: new QueryCache({
        onError: (error: unknown) => {
            const axiosError = error as AxiosError;
            toast.error((axiosError?.response?.data as AxiosError).message);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: unknown) => {
            const axiosError = error as AxiosError;
            toast.error((axiosError?.response?.data as AxiosError).message);
        },
    }),
});
