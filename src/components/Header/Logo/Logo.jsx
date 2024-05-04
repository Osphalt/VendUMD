import "./Logo.css"
import logo from "/img/VendUMD.svg"
import logoVertical from "/img/VendUMD-Vertical.svg"
import { useContext } from "react"
import DesktopContext from "../../context/DesktopContext.jsx"

export default function Logo() {
    const isDesktop = useContext(DesktopContext)
    return (
        <div id="logoDiv">
        {isDesktop ? (
            <img id="logo" src={logo} alt="VendUMD" />
        ) : (
            <img id="logo" src={logoVertical} alt="VendUMD" />
        )}
        </div>
    )
}