import { PropsWithChildren, createContext, useState} from "react";

type QueryContextType = [
    query: string,
    setQuery: (q: string) => void
]

export const QueryContext = createContext<QueryContextType>(["", () => {}])

export function QueryProvider({children}: PropsWithChildren) {
    const state = useState("")

    return ( <QueryContext.Provider value={state}>{children}</QueryContext.Provider>)
}

