import UserNav from "../components/user/UserNav";
import PublicNav from "./PublicNav";
import Logo from "../assets/Logo.png";
import TransLogo from "../assets/Translogo.png";
import { useNavigate } from "react-router-dom";

export default function PublicHeader() {

    const navigate = useNavigate();

    return (
        <header>
            <h2 style={{cursor: "pointer"}} onClick={() => navigate("/", {replace: true})}>
                <img src={TransLogo}/>
                NairaPay
            </h2>
            <PublicNav />
        </header>
    )
}

export function DashHeader() {
    return (
        <header className="dashHeader">
            
            <h3>
                <img src={Logo}/>
                NairaPay
            </h3>
            <UserNav />
        </header>
    )
}

export function NavHeader() {

    const HandleBackHistory = () => {
        history.back();
    }

    return (
        <header className="navHeader">
            <button onClick={HandleBackHistory}><i className="fa-solid fa-chevron-left"></i></button>
            <h2><img src={TransLogo}/>NairaPay</h2>
        </header>
    )
}