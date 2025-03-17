"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

interface TenstackProviderProps{
    children: React.ReactNode
}

export const TanstackProvider = ({children}:TenstackProviderProps) => {
    const [queryClient] = useState(()=> new QueryClient());
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}