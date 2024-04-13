import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Map from "./components/Map/Map.jsx";
import Login from "./components/Auth/Login.jsx";
import DesktopContext from "./components/context/DesktopContext.jsx";
import ActiveContext from "./components/context/ActiveContext.jsx";
import DataContext from "./components/context/DataContext.jsx";
import { loadData } from "./supabase.jsx";

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);
  const [active, setActive] = useState(null);
  const [data, setData] = useState({locations: [], machines: []});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => setDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadData().then(setData);
  }, []);

  return (
    <Router>
      <div id="appDiv">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={
            isLoggedIn ? (
              <ActiveContext.Provider value={{active, setActive}}>
                <DataContext.Provider value={data}>
                  <DesktopContext.Provider value={isDesktop}>
                    <Header />
                    <div className={isDesktop ? "main-desktop" : "main-mobile"}>
                      <Sidebar />
                      <Map />
                    </div>
                  </DesktopContext.Provider>
                </DataContext.Provider>
              </ActiveContext.Provider>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
