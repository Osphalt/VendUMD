//import { createClient } from "@supabase/supabase-js"
import { useEffect, useState} from "react"
import "./App.css"
import Header from "./components/Header/Header.jsx"
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Map from "./components/Map/Map.jsx"
import DesktopContext from "./components/context/DesktopContext.jsx"
import ActiveContext from "./components/context/ActiveContext.jsx"

//size to switch between desktop and mobile views
const windowCutoff = 1024

//const supabase = createClient("https://mzxggfzyoilykqisvenx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eGdnZnp5b2lseWtxaXN2ZW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MDk1MzAsImV4cCI6MjAyMzA4NTUzMH0.cbDp546DDaAUD7hx0ByXFp-ifweprGmxU-m8lTGTqPA")


function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff ? true : false)
  const [active, setActive] = useState(null)

  const resize = () => {
    setDesktop(window.innerWidth >= windowCutoff ? true : false)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
  })

  return (
    <div id="appDiv">
      <ActiveContext.Provider value={active}>
        <DesktopContext.Provider value={isDesktop}>
          <Header/>
          {isDesktop ? (
              <div id="main-desktop">
                <Sidebar/>
                <Map pinObjects={[{name: "CASL Lobby", pos: [0.38, 0.26]}]} setActive={setActive}/>
              </div>
            ) : (
              <div id="main-mobile">
                <Map pinObjects={[{name: "CASL Lobby", pos: [0.39, 0.294]}]} setActive={setActive}/>
                <Sidebar/>
              </div>
            )
          }
        </DesktopContext.Provider>
      </ActiveContext.Provider>
    </div>
  )
}

export default App
