import "./Header.css"
import Logo from "./Logo/Logo.jsx"
import Searchbar from "./Searchbar/Searchbar.jsx"

export default function Header() {
    return (
        <div id="header" className="bg-main w-fill h-header flex align-items-center">
            <Logo/>
            <Searchbar/>
            <p style={{"paddingInline": "1em"}}>Profile</p>
        </div>
    )
}