import { createContext, useState, PropsWithChildren} from "react";

type ActiveContextType = [
    active: Active,
    setActive: (newActive: Active) => void
]

export const ActiveContext = createContext<ActiveContextType>([{location: null, machine: null}, () => {}])

export function ActiveProvider({children}: PropsWithChildren) {
    const state = useState<Active>({location: null, machine: null})

    return ( <ActiveContext.Provider value={state}>{children}</ActiveContext.Provider>)
}