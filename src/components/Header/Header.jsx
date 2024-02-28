import "./Header.css"
import Logo from "./Logo/Logo.jsx"

export default function Header({isDesktop}) {
    return (
        <div id="header">
            <Logo isDesktop={isDesktop}/>
            <p style={{"margin-inline": "auto"}}>Searchbar</p>
            <p style={{"margin-left": "auto", "padding-inline": "1em"}}>Profile</p>
        </div>
    )
}