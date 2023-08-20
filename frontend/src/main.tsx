import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./app/theme";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { queryClient } from "./app/queryClient";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <App />
                        </PersistGate>
                    </Provider>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
