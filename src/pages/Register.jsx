import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { NigeriaStates } from "../components/SelectStates";
import { Loading } from "../components/Loading";

export default function CreateUser() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        state: "",
        terms: false
    });

    const [typing, setTyping] = useState({
        firstname: false,
        lastname: false,
        username: false,
        email: false,
        password: false,
        state: false
    })

    const [seePassword, setSeePassword] = useState(false)

    const navigate = useNavigate();

    const HandleTyping = (e) => {
        setTyping(prev => ({...prev, [e.target.name]: true}));
    }

    const HandleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({...prev, [name]: type === "checkbox" ? checked : value}));
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await api.post("/api/create/user", formData);

            if (!data.success) {
            setMessage("")
            setError(data.message);
            return;
            }

            setMessage(data.message);
            setError("")

            setFormData({
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                state: "",
                terms: false
            })

            setTimeout(() => {
                navigate("/login/user", { replace: true })
            }, 3000)

        } catch (err) {
            setMessage("")
            setError("Something went wrong");
        } finally {
          setLoading(false)
        }
    }

    const GotoLogin = () => {
        navigate("/login/user", { replace: true })
    }

    const handleSelectChange = (name) => {
     setTyping((prev) => ({
    ...prev,
    [name]: true
  }));
};

    return (
        <main className="userAuth create">
            {loading && <Loading />}
            <h1>Create an account</h1>
            <form onSubmit={HandleSubmit}>

                <label>{typing.firstname && "firstname"}
                <input
                type="text"
                name="firstname"
                value={formData.firstname}
                placeholder={!typing.firstname && "enter your firstname..."}
                onClick={HandleTyping}
                onChange={HandleChange}
                />
                </label>

                <label>{typing.lastname && "lastname"}
                <input
                type="text"
                name="lastname"
                value={formData.lastname}
                placeholder={!typing.lastname && "enter your lastname..."}
                onClick={HandleTyping}
                onChange={HandleChange}
                />
                </label>

                <label>{typing.username && "username"}
                <input
                type="text"
                name="username"
                value={formData.username}
                placeholder={!typing.username && "enter your username..."}
                 onClick={HandleTyping}
                onChange={HandleChange}
                />
                </label>

                <label>{typing.email && "email address"}
                <input
                type="email"
                name="email"
                value={formData.email}
                placeholder={!typing.email && "enter your email..."}
                onClick={HandleTyping}
                onChange={HandleChange}
                />
                </label>

                <label style={{position: "relative"}}>{typing.password && "password"}
                <input
                name="password"
                type={!seePassword ? "password" : "text"}
                value={formData.password}
                placeholder={!typing.password && "enter your password..."}
                onClick={HandleTyping}
                onChange={HandleChange}
                />
                {typing.password && (
                    <button type="button" 
                    onClick={() => setSeePassword(!seePassword)} 
                   >
                    {<i className={seePassword ? "fa-solid fa-unlock" : "fa-solid fa-lock"}></i>}
                </button>
                )}
                </label>

                <label onClick={() => handleSelectChange("state")}>{typing.state && "state"}
                <Select
                name="state"
                options={NigeriaStates}
                value={NigeriaStates.find(s => s.value === formData.state)}
                onChange={(option) =>
                setFormData((prev) => ({
                ...prev,
                state: option.value
               }))
               }
                placeholder="Select State"
                />
                </label>
                
                <div className="terms">
                <label>
                <span>i accept these</span>
                <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={HandleChange}
                />
                <Link to="/terms/conditions">terms and conditions</Link>
                </label>
                </div>

               <button type="submit" disabled={loading}>{loading ? "creating" : "continue"}</button>

                <div className="message">
                    {message && <p className="msg">{message}</p>}
                    {error && <p className="err">{error}</p>}
                </div>
            </form>
            <section className="goto">
                <h3>already have an account?</h3>
                <button onClick={GotoLogin}>login</button>
            </section>
        </main>
    )
}