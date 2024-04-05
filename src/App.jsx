import { useEffect, useState} from "react"
import "./App.css"
import Header from "./components/Header/Header.jsx"
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Map from "./components/Map/Map.jsx"
import DesktopContext from "./components/context/DesktopContext.jsx"
import ActiveContext from "./components/context/ActiveContext.jsx"
import {supabase} from "./supabase.jsx"

//size to switch between desktop and mobile views
const windowCutoff = 1024

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff ? true : false)
  const [active, setActive] = useState(null)
  const [locations, setLocations] = useState([])
  

  const resize = () => {
    setDesktop(window.innerWidth >= windowCutoff ? true : false)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
  })

  useEffect(() => {
    async function getLocations() {
      const {data} = await supabase.from("locations").select()
      console.log(data)
      setLocations(data)
    }
    getLocations()
  }, [setLocations])

  return (
    <div id="appDiv">
      <ActiveContext.Provider value={active}>
        <DesktopContext.Provider value={isDesktop}>
          <Header/>
          {isDesktop ? (
              <div className="main-desktop">
                <Sidebar locations={locations} setActive={setActive}/>
                <Map locations={locations} setActive={setActive}/>
              </div>
            ) : (
              <div className="main-mobile">
                <Map locations={locations} setActive={setActive}/>
                <Sidebar locations={locations} setActive={setActive}/>
              </div>
            )
          }
        </DesktopContext.Provider>
      </ActiveContext.Provider>
    </div>
  )
}

export default App
