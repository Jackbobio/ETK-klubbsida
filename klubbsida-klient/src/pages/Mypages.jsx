import { useAuth0 } from "@auth0/auth0-react"
import Errorpanel from "../components/Errorpanel";

export default function Minasidor() {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) return <Errorpanel error={{ message: "Du är inte inloggad!" }} />

    const roles = user["https://localhost:5173/roles"] || [];
    const isAdmin = roles.includes("Administrator");

    return (
        <div>
            {isAdmin && <Adminpanel />}
            <Playerpanel />
        </div>
    )
}