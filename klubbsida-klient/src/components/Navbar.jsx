import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import { AuthButtons } from "./Authbuttons";

export default function Navbar() {
    const { isAuthenticated } = useAuth0();

    return (
        <>
        <div class="flex flex-row justify-between items-center bg-gray-800 text-white p-4 font-bodoni z-20">
            <div>
                {isAuthenticated && (
                <Link to="/Minasidor" class="bg-teal-700 p-2">Mina sidor</Link>
            )}
            {!isAuthenticated && (
                    <h3 class="justify-self-start">Välkommen till Ellagårds tennisklubb</h3>
            )}
            </div>
            <div class="flex flex-row justify-between items-center space-x-20">
            <nav class="flex space-x-15 col-span-2">
                <Link to="/">Hem</Link>
                <Link to="/Omoss">Om oss</Link>
                <Link to="/Medlemskap">Medlemskap</Link>      
            </nav>
            <AuthButtons class="justify-self-end"/>
            </div>
        </div>
        </>
    )
}