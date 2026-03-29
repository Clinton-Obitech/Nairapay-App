import { Outlet } from "react-router-dom";
import { NavHeader } from "../components/Header";
import "../user/user.css";
import Footer from "../components/Footer";
export default function HomeLayout() {
    return (
        <>
        <NavHeader />
        <Outlet />
        <Footer />
        </>
    )
}