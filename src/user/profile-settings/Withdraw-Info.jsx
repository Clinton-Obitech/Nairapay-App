import { useContext, useState, useEffect } from "react"
import { ProfileContext } from "../UserContext";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { Loading } from "../../components/Loading";
import { ApiSuccessMessage } from "../../components/ApiSuccess";
import { Modal } from "../../components/Modal";

export default function EditWithdrawalInfo(
    {loading, setLoading, warning, setWarning, button, disableButton}
) {

    const [apiMsg, setApiMsg] = useState("");

    const [formData, setFormData] = useState({
        account_name: "",
        bank_name: "",
        account_number: ""
    })

    const [showForm, setShowForm] = useState(false);

    const { profile, setProfile } = useContext(ProfileContext);

    useEffect(() => {
        if (profile) {
        setFormData({
        account_name: profile?.account_name || "",
        bank_name: profile?.bank_name || "",
        account_number: profile?.account_number || "",
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
        setWarning("are you sure you want to edit withdrawal info?")
        disableButton(true);
    }

    const SubmitForm = async () => {
        setLoading(true)
        try {
            const { data } = await api.put("/api/user/withdrawal", formData, { withCredentials: true});
            if (data.success) {
              setApiMsg(data.message);
              setProfile(data.profile);
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
        <h2 onClick={HandleShowForm}>{showForm ? "edit withdrawal information" : "withdrawal information"}<i className={showForm ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"}/></h2>
        {showForm && (
            <form onSubmit={HandleSubmit}>
            <label>account name
            <input
            type="text"
            name="account_name"
            value={formData.account_name}
            onChange={HandleChange}
            />
            </label>

            <label>bank name
            <input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={HandleChange}
            />
            </label>

            <label>account number
            <input
            type="number"
            name="account_number"
            value={formData.account_number}
            onChange={HandleChange}
            />
            </label>

            <button type="submit" disabled={button}>continue</button>
        </form>
        )}
        </div>
    )
}