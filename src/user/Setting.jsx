import { Link } from "react-router-dom";

export default function UserSettings() {
    return (
        <main className="settings">
        <h1>settings</h1>
        <nav>
        <Link to="/profile/setting">change profile information</Link>
        </nav>
        </main>
    )
}