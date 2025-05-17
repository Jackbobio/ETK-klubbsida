import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import { AuthButtons } from "./Authbuttons";
import { useEffect } from 'react';
import Hamburger from 'hamburger-react';

export default function Navbar() {
    const { isAuthenticated } = useAuth0();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
            }, [menuOpen]);

    return (
        <div className="bg-gray-800 text-white p-3 sm:p-4 font-bodoni z-20">
            <div className="flex justify-between items-center">
                
                <div>
                    {isAuthenticated ? (
                        <Link to="/Minasidor" className="bg-teal-700 p-2 text-sm sm:text-base whitespace-nowrap transition-transform duration-200 hover:scale-105">Mina sidor</Link>
                    ) : (
                        <h3 className="text-sm sm:text-base md:text-lg max-w-[180px] sm:max-w-none leading-tight whitespace-normal">Välkommen till Ellagårds tennisklubb</h3>
                    )}
                </div>
                {/* Center logo */}
                <div className='flex justify-center items-center'>
                    <img 
                        src="images/ETK-logo-blue.svg"
                        alt="ETK Logga" 
                        className='h-10 sm:h-12 mx-auto sm:mx-0'
                    />
                </div>
                {/* Hamburger menu button */}
                <div className="sm:hidden">
                    <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={24} color="#ffffff"/>
                </div>
                
                {/* Desktop nav */}
                <div className="hidden sm:flex flex-row items-center space-x-6 md:space-x-10">
                    <nav className="flex space-x-4 md:space-x-6">
                        <Link to="/" className="text-sm md:text-base">Hem</Link>
                        <Link to="/Nyheter" className="text-sm md:text-base">Nyheter</Link>
                        <Link to="/Omoss" className="text-sm md:text-base">Om oss</Link>
                        <Link to="/Priser" className="text-sm md:text-base">Priser</Link>
                    </nav>
                    <AuthButtons />
                </div>
            </div>
            {/* Mobile nav */}
            <div
                className={`sm:hidden overflow-hidden transition-all duration-300 ease-out
                    ${menuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'}
                `}
            >
                <nav className="flex flex-col space-y-2 px-4 pt-4">
                    <Link to="/" className="text-base" onClick={() => setMenuOpen(false)}>Hem</Link>
                    <Link to="/Nyheter" className="text-base" onClick={() => setMenuOpen(false)}>Nyheter</Link>
                    <Link to="/Omoss" className="text-base" onClick={() => setMenuOpen(false)}>Om oss</Link>
                    <Link to="/Priser" className="text-base" onClick={() => setMenuOpen(false)}>Priser</Link>
                </nav>
                <div className="mt-2 px-1 pb-2">
                    <AuthButtons />
                </div>
            </div>
        </div>
    );
}