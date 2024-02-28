import "./Logo.css"
import logo from "/src/assets/VendUMD.svg"
import logoVertical from "/src/assets/VendUMD-Vertical.svg"

export default function Logo({isDesktop}) {
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