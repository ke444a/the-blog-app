import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: 500,
        }
    },
    queryCache: new QueryCache({
        onError: (error: unknown) => {
            const axiosError = error as AxiosError;
            toast.error(
                (axiosError?.response?.data as AxiosError).message,
                {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
        }
    })
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
