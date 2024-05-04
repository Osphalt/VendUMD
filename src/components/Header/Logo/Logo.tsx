import "./Logo.css"
import { useContext } from "react"
import DesktopContext from "../../context/DesktopContext"

export default function Logo() {
    const isDesktop = useContext(DesktopContext)
    return (
        <div id="logoDiv">
        {isDesktop ? (
            <img id="logo" src="img/VendUMD.svg" alt="VendUMD" />
        ) : (
            <img id="logo" src="img/VendUMD-Vertical.svg" alt="VendUMD" />
        )}
        </div>
    )
}