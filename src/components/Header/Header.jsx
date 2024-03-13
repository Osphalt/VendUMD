import "./Header.css"
import Logo from "./Logo/Logo.jsx"

export default function Header() {
    return (
        <div id="header">
            <Logo/>
            <p style={{"marginInline": "auto"}}>Searchbar</p>
            <p style={{"paddingInline": "1em"}}>Profile</p>
        </div>
    )
}