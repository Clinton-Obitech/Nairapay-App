import api from "../api/axios";
import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();
export const ProfileContext = createContext();

export function DashboardProvider({children}) {

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        const getDashboard = async () => {
            try {
            const { data } = await api.get("/api/user/dashboard", 
                { withCredentials:true }
            );
            setDashboard(data.dashboard);

        } catch (err) {
            setDashboard({})
        }
        }
        getDashboard();
    }, [])

    return (
        <>
        <DashboardContext.Provider value={{dashboard, setDashboard}}>
            {children}
        </DashboardContext.Provider>
        </>
    )
}

export function ProfileProvider({children}) {

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            try {
            const { data } = await api.get("/api/user/profile", 
                { withCredentials:true }
            );
            setProfile(data.profile);

        } catch (err) {
            setProfile({})
        }
        }
        getProfile();
    }, [])

    return (
        <>
        <ProfileContext.Provider value={{profile, setProfile}}>
            {children}
        </ProfileContext.Provider>
        </>
    )
}