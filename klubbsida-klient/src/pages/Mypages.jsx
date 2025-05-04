import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Errorpanel from "../components/Errorpanel";
import AdminPanel from "../components/AdminPanel";
import Playerpanel from "../components/Playerpanel";
import { useApi } from '../utils/api';

export default function Minasidor() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(false);
    // const [error, setError] = useState(null);
    const { get } = useApi();

    // Check if user has admin role
    useEffect(() => {
        if (!isAuthenticated || !user) return;

        // First check client-side roles (for UI purposes)
        const clientRoles = user["https://localhost:5173/roles"] || [];

        console.log(clientRoles)
        
        const hasAdminRole = clientRoles.includes("Administrator");
        setIsAdmin(hasAdminRole);

        // If client-side check indicates admin, verify with server
        if (hasAdminRole) {
            const verifyAdminWithServer = async () => {
                try {
                    await get('/admin');
                    // If we get here, the server confirmed admin access
                    setIsAdmin(true);
                } catch (err) {
                    console.log('Server admin verification failed:', err);
                    // Don't change isAdmin state here - we'll still show the UI
                    // but API calls will fail appropriately
                }
            };
            
            verifyAdminWithServer();
        }
    }, [isAuthenticated, user, get]);

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

    console.log(isAdmin)

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