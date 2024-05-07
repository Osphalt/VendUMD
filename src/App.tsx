import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Map from "./components/Map/Map.tsx";
import DesktopContext from "./components/context/DesktopContext.tsx";
import {ActiveProvider} from "./components/context/ActiveContext.tsx";
import DataContext from "./components/context/DataContext.tsx";
import {QueryProvider} from "./components/context/QueryContext.tsx";
import SessionContext from "./components/context/SessionContext.tsx";
import { loadData, supabase } from "./supabase.tsx";
import { Session } from "@supabase/supabase-js";

const windowCutoff = 1024

export default function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff);
  const [data, setData] = useState<DB.Data>({locations: [], machines: [], contents: []}); 
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    //get session and user
    supabase.auth.getSession().then((sessionData) => {setSession(sessionData.data.session)})

    //get data for application
    loadData().then(setData);

    //setup resize event
    window.addEventListener("resize", () => setDesktop(window.innerWidth >= windowCutoff));
    return () => window.removeEventListener("resize", () => setDesktop(window.innerWidth >= windowCutoff));
  }, []);

  return (
      <div id="appDiv">
        <SessionContext.Provider value={session}>
          <ActiveProvider>
            <DataContext.Provider value={data}>
              <QueryProvider>
                <DesktopContext.Provider value={isDesktop}>
                  <Header />
                  {window.innerWidth >= 1024 ? (
                      <div className="main-desktop">
                        <Sidebar />
                        <Map />
                      </div>
                    ) : (
                      <div className="main-mobile">
                        <Map />
                        <Sidebar />
                      </div>
                    )}
                </DesktopContext.Provider>
              </QueryProvider>
            </DataContext.Provider>
          </ActiveProvider>
        </SessionContext.Provider>
      </div>
  )
}