import { PropsWithChildren, createContext, useContext, useState} from "react";

type QueryContextType = [
    query: string,
    setQuery: (q: string) => void
]

export const QueryContext = createContext<QueryContextType | null>(null)

export function QueryProvider({children}: PropsWithChildren) {
    const state = useState("")

    return ( <QueryContext.Provider value={state}>{children}</QueryContext.Provider>)
}

export function useQueryContext() {
    const context = useContext(QueryContext)
    
    if(!context) throw new Error("useQueryContext must be used inside QueryProvider")

    return context
}


