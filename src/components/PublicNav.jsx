import { useState } from "react";
import { Link } from "react-router-dom";

export default function PublicNav() {

    const [openNav, setOpenNav] = useState(false);

    const HandleNav = () => {
        setOpenNav(!openNav);
    }

    return (
        <>
        <button onClick={HandleNav}>{<i className={!openNav ? "fa-solid fa-bars" : "fa-solid fa-xmark"} />}</button>
        {openNav && (
        <nav className="PublicNav">
        <Link to="/how/to"><i className="fa-brands fa-readme"></i>how to earn</Link>
        <Link to="/about/us"><i className="fa-solid fa-circle-info"></i>about</Link>
        <Link to="/contact/us"><i className="fa-solid fa-phone"></i>contact</Link>
        <Link to="/faq"><i className="fa-solid fa-circle-question"></i>FAQ</Link>
        </nav>
        )}
        </>
    )
}