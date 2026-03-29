import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import Logo from "../assets/Translogo.png";
import { DashboardContext } from "./UserContext";
import { Loading } from "../components/Loading";
import { ApiSuccessMessage } from "../components/ApiSuccess";

export default function UserDashboard() {

    const [loading, setLoading] = useState(false);

    const [apiMsg, setApiMsg] = useState("");

    const { dashboard, setDashboard } = useContext(DashboardContext);

    if (!dashboard) return <Navigate to="/login/user" />

    const HandleClick = async () => {
        try {
            const { data } = await api.post("/api/click", {}, { withCredentials: true});
            if (data.success) {
                setDashboard(data.dashboard)
            } else {
                setApiMsg(data.message)
            }
        } catch (err) {
            toast.error("something went wrong")
        }
    }

    const HandleCollect = async () => {
        setLoading(true)
        try {
            const { data } = await api.post("/api/collect", {}, { withCredentials: true });
            if (data.success) {
                setDashboard(data.dashboard);
                setApiMsg(data.message);
            } else {
                setApiMsg(data.message);
            }
        } catch (err) {
            toast.error("something went wrong");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const HandleReset = async () => {
        try {
            const { data } = await api.get("/api/reset", { withCredentials: true});
            if (data.success) {
                setDashboard(data.dashboard);
                setApiMsg(data.message);
            }
        } catch (err) {
            toast.error("something went wrong");
        } 
    }
    HandleReset();
    }, [])

    return (
        <main className="userDashboard">
            {loading && <Loading />}
            {!loading && <ApiSuccessMessage message={apiMsg} setMessage={setApiMsg}/>}
            <section className="top">
                <h2><span>{dashboard?.username}</span> Dashboard</h2>
                <div>
                    <h3>naira balance</h3>
                    <span><img src={Logo} height={"20px"} width={"20px"} />{dashboard?.naira_balance}</span>
                </div>
            </section>

            <section className="center">
                <h3>nairatoken</h3>
                <span>{dashboard?.naira_token}</span>
                <button type="button" className="click" onClick={HandleClick}><img src={Logo} height={"100%"} width={"100%"}/></button>
                <div className="refill"><i className="fa-solid fa-bolt"></i>{dashboard?.refill}/1000</div>
                <button type="button" className="collect" onClick={HandleCollect}>Collect</button>
            </section>

            <section className="bottom">
                    <NavLink to="/user/daily/task">
                    <i className="fa-solid fa-list-check"/><br />
                    <span>daily tasks</span>
                    </NavLink>
    
                    <NavLink to="/user/earn">
                    <i className="fa-solid fa-briefcase"/><br />
                    <span>earn</span>
                    </NavLink>
                
                    <NavLink to="/user/refer">
                    <i className="fa-solid fa-user-group"/><br />
                    <span>refer/invite</span>
                    </NavLink>
            </section>
        </main>
    )
}