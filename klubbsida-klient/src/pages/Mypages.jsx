import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Errorpanel from "../components/Errorpanel";
import AdminPanel from "../components/AdminPanel";
import Playerpanel from "../components/Playerpanel";
import { useApi } from '../utils/api';

export default function Minasidor() {
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const { get } = useApi();

    // Check if user has admin role
    useEffect(() => {
        if (!isAuthenticated || !user) return;

        // First check client-side roles (for UI purposes)
        const clientRoles = user["https://localhost:5173/roles"] || 
                           user["https://dev-nwurgok5vi3aouh3.eu.auth0.com/roles"] || [];

        console.log("User roles:", clientRoles);
        
        const hasAdminRole = clientRoles.includes("Administrator");
        setIsAdmin(hasAdminRole);

        // If client-side check indicates admin, verify with server
        if (hasAdminRole) {
            const verifyAdminWithServer = async () => {
                try {
                    await get('/admin');
                    // Server confirms admin access
                    setIsAdmin(true);
                    setError(null);
                } catch (err) {
                    console.log('Server admin verification failed:', err);
                    
                    // Handle token errors specifically
                    if (err.message.includes('access token')) {
                        setError('Authentication session expired. Please log in again.');
                        // Optionally redirect to login after a delay
                        setTimeout(() => loginWithRedirect(), 3000);
                    }
                }
            };
            
            verifyAdminWithServer();
        }
    }, [isAuthenticated, user, get, loginWithRedirect]);

    // Show loading state
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Loading user information...</p>
        </div>;
    }

    // Show error if not authenticated
    if (!isAuthenticated) {
        return <Errorpanel error={{ message: "Du är inte inloggad! Logga in för att se dina sidor." }} />;
    }

    // Show error message if there is one
    if (error) {
        return <Errorpanel error={{ message: error }} />;
    }

    console.log("Is admin:", isAdmin);

    return (
        <div>
            {isAdmin ? (
                <AdminPanel />
            ) : (
                <Playerpanel />
            )}
        </div>
    );
}