import { useContext } from "react"
import "./Sidebar.css"
import Machine from "./Views/Machine/Machine.jsx"
import Locations from "./Views/Locations/Locations.jsx"
import DesktopContext from "../context/DesktopContext.jsx"
import ActiveContext from "../context/ActiveContext.jsx"

function SidebarDiv({children}) {
    const isDesktop = useContext(DesktopContext)
    return (
        <>
        {isDesktop ? (
            <div className="sidebar sidebarDesktop">{children}</div>
        ) : (
            <div className="sidebar sidebarMobile">{children}</div>
        )}
        </>
    )
}

export default function Sidebar({locations, setActive}) {
    const active = useContext(ActiveContext)
    return (
        <SidebarDiv>
            <Locations locations={locations} setActive={setActive}/>
            <Machine active={active}/>
        </SidebarDiv>
    )
}