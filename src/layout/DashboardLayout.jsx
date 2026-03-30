import { Outlet } from "react-router-dom";
import { DashHeader } from "../components/Header";
import "../layout/layout.css";

export default function DashboardLayout() {
    return (
        <div className="dashLayout">
        <DashHeader />
        <Outlet />
        </div>
    )
}