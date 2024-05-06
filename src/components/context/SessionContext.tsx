import { createContext } from "react";
import { Session } from "@supabase/supabase-js";

const SessionContext = createContext<Session | null>(null)

export default SessionContext