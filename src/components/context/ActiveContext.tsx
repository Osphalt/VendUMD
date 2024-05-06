import { createContext, useContext,useState, PropsWithChildren} from "react";

type ActiveContextType = [
    active: Active,
    setActive: (newActive: Active) => void
]

export const ActiveContext = createContext<ActiveContextType | null>(null)

export function ActiveProvider({children}: PropsWithChildren) {
    const state = useState<Active>({location: null, machine: null})

    return ( <ActiveContext.Provider value={state}>{children}</ActiveContext.Provider>)
}

export function useActiveContext() {
    const context = useContext(ActiveContext)
    
    if(!context) throw new Error("useQueryContext must be used inside QueryProvider")

    return context
}