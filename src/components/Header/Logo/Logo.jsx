import "./Logo.css"
import logo from "/src/assets/VendUMD.svg"
import logoVertical from "/src/assets/VendUMD-Vertical.svg"
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