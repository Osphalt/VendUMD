import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Map from "./components/Map/Map.jsx";
import DesktopContext from "./components/context/DesktopContext.jsx";
import ActiveContext from "./components/context/ActiveContext.jsx";
import DataContext from "./components/context/DataContext.jsx";
import QueryContext from "./components/context/QueryContext.jsx";
import SessionContext from "./components/context/SessionContext.jsx";
import LoginForm from "./components/Auth/Login.jsx";
import { getSession, loadData } from "./supabase.jsx";

const windowCutoff = 1024;

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff);
  const [active, setActive] = useState({ location: null, machine: null });
  const [data, setData] = useState({ locations: [], machines: [], contents: [] }); 
  const [session, setSession] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
      localStorage.setItem('isLoggedIn', !!currentSession); // Correctly set based on actual session
    };
    loadData().then(setData);
    checkLoginStatus();
    window.addEventListener("resize", () => setDesktop(window.innerWidth >= windowCutoff));
    return () => window.removeEventListener("resize", () => setDesktop(window.innerWidth >= windowCutoff));
  }, []);

  return (
    <Router>
      <div id="appDiv">
        <SessionContext.Provider value={session}>
          <ActiveContext.Provider value={{ active, setActive }}>
            <DataContext.Provider value={data}>
              <QueryContext.Provider value={{ query, setQuery }}>
                <DesktopContext.Provider value={isDesktop}>
                  <Header />
                  <Routes>
                    <Route path="/login" element={<LoginForm setLogin={setSession} />} />
                    <Route path="/" element={localStorage.getItem('isLoggedIn') === 'true' ? (
                      <div className="main-content">
                        {isDesktop ? (
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
                      </div>
                    ) : (
                      <Navigate to="/login" replace />
                    )} />
                  </Routes>
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
