import { useContext } from "react"
import "./Sidebar.css"
import Locations from "./Views/Locations/Locations.jsx"
import DesktopContext from "../context/DesktopContext.jsx"

function SidebarDiv({children}) {
    const isDesktop = useContext(DesktopContext)
    return (isDesktop ? (
            <div className="sidebar sidebarDesktop">{children}</div>
        ) : (
            <div className="sidebar sidebarMobile">{children}</div>
        )
    )
}

export default function Sidebar() {
    return (
        <SidebarDiv>
            <Locations/>
        </SidebarDiv>
    )
}