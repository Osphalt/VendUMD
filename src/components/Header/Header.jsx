import "./Header.css"
import Logo from "./Logo/Logo.jsx"

export default function Header({isDesktop}) {
    return (
        <div id="header">
            <Logo isDesktop={isDesktop}/>
            <p style={{"marginInline": "auto"}}>Searchbar</p>
            <p style={{"paddingInline": "1em"}}>Profile</p>
        </div>
    )
}