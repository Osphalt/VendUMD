import "./Header.css";
import Logo from "./Logo/Logo";
import Profile from "./Profile/Profile";
import Searchbar from "./Searchbar/Searchbar";

export default function Header() {

    return (
        <div id="header" className="bg-main w-fill h-header flex align-items-center">
            <Logo />
            <Searchbar />
            <Profile />
        </div>
    );
}
