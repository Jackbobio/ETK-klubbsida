import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import { AuthButtons } from "./Authbuttons";

export default function Navbar() {
    const { isAuthenticated } = useAuth0();

    return (
        <>
        <div className="flex flex-row justify-between items-center bg-gray-800 text-white p-4 font-bodoni z-20">
            <div>
                {isAuthenticated && (
                <Link to="/Minasidor" className="bg-teal-700 p-2">Mina sidor</Link>
            )}
            {!isAuthenticated && (
                    <h3 className="justify-self-start">Välkommen till Ellagårds tennisklubb</h3>
            )}
            </div>
            <div className="flex flex-row justify-between items-center space-x-20">
            <nav className="flex space-x-15 col-span-2">
                <Link to="/">Hem</Link>
                <Link to="/Nyheter">Nyheter</Link>
                <Link to="/Omoss">Om oss</Link>
                <Link to="/Medlemskap">Medlemskap</Link>      
            </nav>
            <AuthButtons className="justify-self-end"/>
            </div>
        </div>
        </>
    )
}