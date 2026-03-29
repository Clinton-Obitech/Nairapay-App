import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoutUser} from "./Logout-button";

export default function UserNav() {

    const [openNav, setOpenNav] = useState(false);

    const HandleNav = () => {
        setOpenNav(!openNav);
    }

    return (
        <>
        <button onClick={HandleNav}>{<i className={!openNav ? "fa-solid fa-bars" : "fa-solid fa-xmark"} />}</button>
        {openNav && (
        <nav className="userNav">
        <Link to="/user/profile"><i className="fa-solid fa-user"></i>profile</Link>
        <Link to="/user/settings"><i className="fa-solid fa-user-pen"></i>settings</Link>
        <Link to="/user/withdraw"><i className="fa-solid fa-money-bill"></i>withdraw</Link>
        <Link to="/user/transaction"><i className="fa-solid fa-cash-register"></i>transactions</Link>
        <Link to="/how/to"><i className="fa-brands fa-readme"></i>how to earn</Link>
        <Link to="/about/us"><i className="fa-solid fa-circle-info"></i>about</Link>
        <Link to="/contact/us"><i className="fa-solid fa-phone"></i>contact</Link>
        <Link to="/faq"><i className="fa-solid fa-circle-question"></i>FAQ</Link>

        <LogoutUser />

        <div>
        <Link to="/terms">terms</Link> 
        <Link to="/policy">policy</Link>
        </div>
        </nav>
        )}
        </>
    )
}