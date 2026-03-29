import { useContext } from "react";
import { ProfileContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function UserProfile() {

    const { profile } = useContext(ProfileContext);

    if (!profile) return <Navigate to="/login/user" />

    return (
        <div className="userProfile">
        <h1>my profile</h1>

        <section className="user">
            <div className="img">
                {profile?.username?.slice(0,1)?.toUpperCase()}
            </div>
            <h2>{profile?.username}</h2>
        </section>

        <div className="personal-info">
            <h2>personal information</h2>
            <section>
            <ul>
               <li><span>fullname</span>{profile?.firstname} {profile?.lastname}</li>
               <li><span>state</span>{profile?.state}</li>
               <li><span>email address</span>{profile?.email}</li>
            </ul>
            </section>
        </div>

        <div className="personal-info">
            <h2>withdrawal information</h2>
            <section>
            <ul>
               <li><span>account name</span>{profile?.account_name}</li>
               <li><span>bank name</span>{profile?.bank_name}</li>
               <li><span>account number</span>{profile?.account_number}</li>
            </ul>
            </section>
        </div>

        </div>
    )
}