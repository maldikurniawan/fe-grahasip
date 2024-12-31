"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <ToastContainer className="z-[99999999999999]" />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AppProvider>
    );
}


