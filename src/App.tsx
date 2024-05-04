import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Map from "./components/Map/Map.tsx";
import DesktopContext from "./components/context/DesktopContext.tsx";
import ActiveContext from "./components/context/ActiveContext.tsx";
import DataContext from "./components/context/DataContext.tsx";
import QueryContext from "./components/context/QueryContext.tsx";
import SessionContext from "./components/context/SessionContext.tsx";
import { loadData, supabase } from "./supabase.tsx";

const windowCutoff = 1024;

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff);
  const [active, setActive] = useState({ location: null, machine: null });
  const [data, setData] = useState({ locations: [], machines: [], contents: [] }); 
  const [session, setSession] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //get session and user
    supabase.auth.getSession().then((sessionData) => {setSession(sessionData.data.session)})

    //get data for application
    loadData().then(setData);

    //setup resize event
    window.addEventListener("resize", () => setDesktop(window.innerWidth >= windowCutoff));
    return () => window.removeEventListener("resize", () => setDesktop(window.innerWidth >= windowCutoff));
  }, []);

  console.log(session)

  return (
      <div id="appDiv">
        <SessionContext.Provider value={session}>
          <ActiveContext.Provider value={{ active, setActive }}>
            <DataContext.Provider value={data}>
              <QueryContext.Provider value={{ query, setQuery }}>
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
              </QueryContext.Provider>
            </DataContext.Provider>
          </ActiveContext.Provider>
        </SessionContext.Provider>
      </div>
  )
}


export default App;
