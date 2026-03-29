import { Outlet } from "react-router-dom";
import { DashHeader } from "../components/Header";

export default function DashboardLayout() {
    return (
        <>
        <DashHeader />
        <Outlet />
        </>
    )
}