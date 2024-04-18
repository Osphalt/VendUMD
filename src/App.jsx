import { useEffect, useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Map from "./components/Map/Map.jsx";
import DesktopContext from "./components/context/DesktopContext.jsx";
import ActiveContext from "./components/context/ActiveContext.jsx";
import DataContext from "./components/context/DataContext.jsx";
import QueryContext from "./components/context/QueryContext.jsx"
import { getSession, loadData } from "./supabase.jsx";
import SessionContext from "./components/context/SessionContext.jsx";

/**
 * Data object containing initial data from VendUMD Database
 * @typedef {Object} Data
 * @property {Location[]} locations
 * @property {Machine[]} machines
 * @property {Content[]} contents
 */


const windowCutoff = 1024;

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff);
  const [active, setActive] = useState({location: null, machine: null}); //id of active location or machine
  /**@type {Data} */
  const [data, setData] = useState({ locations: [], machines: [], contents: [] }); 
  const [session, setSession] = useState(null) //supabase client session - includes user prop
  const [query, setQuery] = useState("") //search query

  const resize = () => {
    setDesktop(window.innerWidth >= windowCutoff);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });

  useEffect(() => {
    loadData().then(setData);

    getSession().then(setSession)
  }, []);

  return (
    <Router>
      <div id="appDiv">
        <SessionContext.Provider value={session}>
          <ActiveContext.Provider value={{active, setActive}}>
            <DataContext.Provider value={data}>
              <QueryContext.Provider value={{query,setQuery}} >
                <DesktopContext.Provider value={isDesktop}>
                  <Header />
                  { isDesktop ? <div className="main-desktop">
                    <Sidebar />
                    <Map />
                  </div> : <div className="main-mobile">
                    <Map />
                    <Sidebar />
                  </div>}
                </DesktopContext.Provider>
              </QueryContext.Provider>
            </DataContext.Provider>
          </ActiveContext.Provider>
        </SessionContext.Provider>
      </div>
    </Router>
  );
}

export default App;
