import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export function LogoutUser() {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const HandleLogout = async () => {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:3000/api/user/logout", {}, { withCredentials: true });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login/user", { replace: true });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <button
        className="logout-btn"
        type="button"
        onClick={HandleLogout}
        >{loading ? "loading..." : "logout"}</button>
        </>
    )
}