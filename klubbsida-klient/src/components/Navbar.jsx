import { Link } from "react-router-dom";
import { AuthButtons } from "./Authbuttons";

export default function Navbar() {
    return (
        <>
        <div class="flex flex-row justify-between items-center bg-gray-800 text-white p-4 font-bodoni z-20">
        <h3>Välkommen till Ellagårds tennisklubb</h3>
        <nav class="flex space-x-30">
            <Link to="/">Hem</Link>
            <Link to="/About">Om oss</Link>
            <Link to="/Membership">Medlemskap</Link>
        </nav>
        <AuthButtons />
        </div>
        </>
    )
}