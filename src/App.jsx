import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import Register from "./components/Auth/Register.jsx";  // Adjust the path as needed

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
      localStorage.setItem('isLoggedIn', !!currentSession);
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
                  <MainContent setSession={setSession} />
                </DesktopContext.Provider>
              </QueryContext.Provider>
            </DataContext.Provider>
          </ActiveContext.Provider>
        </SessionContext.Provider>
      </div>
    </Router>
  );
}

function MainContent({ setSession }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/login" element={<LoginForm setLogin={setSession} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={localStorage.getItem('isLoggedIn') === 'true' ? (
          <div className="main-content">
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
          </div>
        ) : (
          <Navigate to="/login" replace />
        )} />
      </Routes>
    </>
  );
}


export default App;
