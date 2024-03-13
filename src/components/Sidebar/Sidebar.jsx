import "./Sidebar.css"
import Machine from "./Views/Machine/Machine.jsx"
function SidebarDiv({isDesktop, children}) {
    return (
        <>
        {isDesktop ? (
            <div id="sidebar-desktop">{children}</div>
        ) : (
            <div id="sidebar-mobile">{children}</div>
        )}
        </>
    )
}

export default function Sidebar({isDesktop}) {
    return (
        <SidebarDiv isDesktop={isDesktop}>
            <h3>Sidebar Section</h3>
            <Machine/>
        </SidebarDiv>
    )
}