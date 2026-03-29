import { useState } from "react";
import EditPersonalInfo from "./Personal-Info";
import EditWithdrawalInfo from "./Withdraw-Info";

export default function ProfileSetting() {

    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const [button, disableButton] = useState(false)

    return (
        <div className="profile-settings">
        <h1>profile settings</h1>
        <section>
            <EditPersonalInfo 
            loading={loading} 
            setLoading={setLoading} 
            warning={warning} 
            setWarning={setWarning}
            button={button}
            disableButton={disableButton}
            />

            <EditWithdrawalInfo 
            loading={loading} 
            setLoading={setLoading}
            warning={warning} 
            setWarning={setWarning}
            button={button}
            disableButton={disableButton}
            />
        </section>
        </div>
    )
}