import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import PublicHeader from "../components/Header";

export default function PublicLayout() {
    return (
        <>
        <PublicHeader/>
        <Outlet />
        <Footer />
        </>
    )
}