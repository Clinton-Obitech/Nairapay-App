import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Homepic from "../assets/Homepic.png";

export default function Home() {
    return (
        <main className="home">
            <div className="hero">
                <img className="logo" src={Logo} />
                <img className="pic" src={Homepic} />
            </div>
            <nav className="authLinks">
                <NavLink to="/login/user">Login</NavLink>
                <NavLink to="/create/user">Create an Account</NavLink>
            </nav>

        </main>
    )
}