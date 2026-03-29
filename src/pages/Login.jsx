import api from "../api/axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardContext, ProfileContext } from "../user/UserContext"
import { Loading } from "../components/Loading"

export default function LoginUser() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [typing, setTyping] = useState({
        username: false,
        password: false
    })

    const { setDashboard } = useContext(DashboardContext);
    const { setProfile } = useContext(ProfileContext);

    const [seePassword, setSeePassword] = useState(false)

    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await api.post("/api/login/user", formData, { withCredentials: true });
            if (!data.success) {
                setError(data.message)
                setMessage("");
                return;
            } 
            setDashboard(data.dashboard);
            setProfile(data.profile);

            setMessage(data.message)
            setError("")

            setFormData({
                username: "",
                password: ""
            })

            setTimeout(() => {
                navigate("/user/dashboard", { replace: true });
            }, 3000)

        } catch (err) {
            setError("Something went wrong");
            setMessage("");
        } finally {
            setLoading(false)
        }
    }

    const GotoCreate = () => {
        navigate("/create/user", { replace: true })
    }

    const HandleTyping = (e) => {
        setTyping(prev => ({
            ...prev, [e.target.name]: true
        }))
    }

    const HandleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({...prev, [name]: value}))

    }

    return ( 
        <main className="userAuth login">
            {loading && <Loading />}
            <h1>Login</h1>
            <form onSubmit={HandleSubmit}>

                <label>{typing.username ? "username" : null}
                <input
                type="text"
                name="username"
                value={formData.username}
                placeholder={!typing.username ? "enter your username..." : null}
                onChange={HandleChange}
                onClick={HandleTyping}
                />
                </label>

                <label>{typing.password ? "password" : null}
                <input
                type={!seePassword ? "password" : "text"}
                name="password"
                value={formData.password}
                placeholder={!typing.password ? "enter your password..." : null}
                onChange={HandleChange}
                onClick={HandleTyping}
                />
                {typing.password && (
                    <button type="button" 
                    onClick={() => setSeePassword(!seePassword)} 
                    >
                    {<i className={seePassword ? "fa-solid fa-unlock" : "fa-solid fa-lock"}></i>}
                </button>
                )}
                </label>

                <button type="submit" disabled={loading}>{loading ? "loggin" : "continue"}</button>
                <div className="message">
                    {message && <p className="msg">{message}</p>}
                    {error && <p className="err">{error}</p>}
                </div>
            </form>

            <section className="goto">
                <h3>don't have an account?</h3>
                <button onClick={GotoCreate}>create account</button>
            </section>
        </main>
    )
}