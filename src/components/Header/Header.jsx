import "./Header.css"
import Logo from "./Logo/Logo.jsx"

export default function Header() {
    return (
        <div className="bg-main w-fill h-header flex align-items-center">
            <Logo/>
            <p style={{"marginInline": "auto"}}>Searchbar</p>
            <p style={{"paddingInline": "1em"}}>Profile</p>
        </div>
    )
}