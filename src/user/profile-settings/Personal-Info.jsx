import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import api from "../../api/axios";
import { DashboardContext, ProfileContext } from "../UserContext";
import { Loading } from "../../components/Loading";
import { ApiSuccessMessage } from "../../components/ApiSuccess";
import { Modal } from "../../components/Modal";

export default function EditPersonalInfo(
    {loading, setLoading, warning, setWarning, button, disableButton}
) {

    const [apiMsg, setApiMsg] = useState("");

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: ""
    });

    const { profile, setProfile } = useContext(ProfileContext);
    const { setDashboard } = useContext(DashboardContext);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
        firstname: profile?.firstname || "",
        lastname: profile?.lastname || "",
        username: profile?.username || "",
        email: profile?.email || ""
        })
        }
    }, [profile])


    const HandleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setWarning("are you sure you want to update personal info?");
        disableButton(true)
    }

    const SubmitForm = async () => {
        setLoading(true);
        try {
            const { data } = await api.put("/api/update/user", formData, { withCredentials: true});
            if (data.success) {
              setApiMsg(data.message);
              setProfile(data.profile);
              setDashboard(data.dashboard);
            } else {
                setApiMsg(data.message);
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
            setWarning("")
            disableButton(false)
        }
    } 

    const HandleShowForm = () => {
        setShowForm(!showForm)
        setWarning("")
        disableButton(false)
    }

    return (
        <div>
        {loading && <Loading />}
        {!loading && <ApiSuccessMessage message={apiMsg} setMessage={setApiMsg}/>}
        <Modal warning={warning} setWarning={setWarning} onConfirm={SubmitForm} disableButton={disableButton}/>
        <h2 onClick={HandleShowForm}>{showForm ? "edit personal information" : "personal information"}<i className={showForm ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"}/></h2>
        {showForm && (
            <form onSubmit={HandleSubmit}>
            <label>firstname
            <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={HandleChange}
            />
            </label>

            <label>lastname
            <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={HandleChange}
            />
            </label>

            <label>username
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={HandleChange}
            />
            </label>

            <label>email address
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={HandleChange}
            />
            </label>

            <button type="submit" disabled={button}>continue</button>
        </form>
        )}
    </div>
    )
}