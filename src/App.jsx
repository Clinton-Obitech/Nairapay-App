import "./App.css";
import { Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginUser from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import CreateUser from "./pages/Register.jsx";
import UserDashboard from "./user/Dashboard.jsx";
import UserProfile from "./user/Profile.jsx";
import UserSettings from "./user/Setting.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import UserWithdrawal from "./user/Withdraw.jsx";
import UserTransaction from "./user/Transactions.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import Policy from "./pages/Policy.jsx";
import Terms from "./pages/Terms.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import ProfileSetting from "./user/profile-settings/ProfileSetting.jsx";

export default function App() {
  return (
    <>
    <Routes>
      <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/create/user" element={<CreateUser />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/profile/setting" element={<ProfileSetting />} />
        <Route path="/user/withdraw" element={<UserWithdrawal />} />
        <Route path="/user/transaction" element={<UserTransaction />} />
        <Route path="/our/service" element={<Services />} />
        <Route path="/about/us" element={<About />} />
        <Route path="/contact/us" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy/policy" element={<Policy />} />
        <Route path="/terms/conditions" element={<Terms />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Route>

    </Routes>

    <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}