import { useContext } from "react"
import "./Sidebar.css"
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

export default function Sidebar() {
    const active = useContext(ActiveContext)
    return (
        <SidebarDiv>
            <h3>Sidebar Section</h3>
            <p>{active}</p>
        </SidebarDiv>
    )
}