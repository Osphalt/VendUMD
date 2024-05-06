import { useContext, PropsWithChildren } from "react"
import "./Sidebar.css"
import Locations from "./Views/Locations/Locations.tsx"
import DesktopContext from "../context/DesktopContext.tsx"

function SidebarDiv({children}: PropsWithChildren) {
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