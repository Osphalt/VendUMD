import { useEffect, useState} from "react"
import "./App.css"
import Header from "./components/Header/Header.jsx"
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Map from "./components/Map/Map.jsx"
import DesktopContext from "./components/context/DesktopContext.jsx"
import ActiveContext from "./components/context/ActiveContext.jsx"
import DataContext from "./components/context/DataContext.jsx"
import {loadData} from "./supabase.jsx"

/**
 * @typedef {Object} Data
 * @property {Locations[]} locations
 * @property {Machines[]} machines
 */

//size to switch between desktop and mobile views
const windowCutoff = 1024

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= windowCutoff ? true : false)
  const [active, setActive] = useState(null)
  const [data, setData] = useState({locations: [], machines: []})

  const resize = () => {
    setDesktop(window.innerWidth >= windowCutoff ? true : false)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
  })

  useEffect(() => {
    loadData().then((dbData) => {
      console.log(dbData)
      setData(dbData)
    })
  }, [setData])

  return (
    <div id="appDiv">
      <ActiveContext.Provider value={{active, setActive}}>
        <DataContext.Provider value={data}>
          <DesktopContext.Provider value={isDesktop}>
            <Header/>
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
              )
            }
          </DesktopContext.Provider>
        </DataContext.Provider>
      </ActiveContext.Provider>
    </div>
  )
}

export default App
