import React from 'react';
import { useState, useEffect } from 'react';
import { useApi } from '../utils/api';
import { useAuth0 } from '@auth0/auth0-react';

// Import the new components
import AdminHeader from './admin/AdminHeader';
import StatusMessage from './admin/StatusMessage';
import NewsForm from './admin/NewsForm';

export default function AdminPanel() {
    const [adminMessage, setAdminMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newsForm, setNewsForm] = useState({ title: '', content: '', coverpage: '', contentImage: '' });
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { get, post } = useApi();

    // Verify admin access on component mount
    useEffect(() => {
        const verifyAdminAccess = async () => {
            console.log("Verifying admin access")
            console.log("Is authenticated:", isAuthenticated)

            if (!isAuthenticated) {
                setError('You must be logged in to access the admin panel');
                return;
            }
            
            setLoading(true);
            setError('');
            
            try {
                const response = await get('/admin');
                setAdminMessage(response.message);
            } catch (err) {
                console.error('Admin verification error:', err);
                
                // Handle token errors specifically
                if (err.message.includes('access token')) {
                    setError('Authentication session expired. Please log in again.');
                    // Optionally redirect to login after a delay
                    setTimeout(() => loginWithRedirect(), 3000);
                } else {
                    setError('Failed to verify admin access. Please make sure you have administrator privileges.');
                }
            } finally {
                console.log("Set loading to false")
                setLoading(false);
            }
        };

        verifyAdminAccess();
    }, [isAuthenticated, get, loginWithRedirect]);

    // Handle news form submission
    const handleSubmitNews = async (e) => {
        e.preventDefault();
        
        if (!newsForm.title || !newsForm.content || !newsForm.coverpage) {
            setError('Title, content and coverpage are required');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            await post('/news', newsForm);
            setNewsForm({ title: '', content: '', coverpage: '', contentImage: '' });
            alert('News post created successfully!');
        } catch (err) {
            setError('Failed to create news post. ' + err.message);
            console.error('News creation error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start p-6 bg-gray-100 min-h-screen">
            <AdminHeader />
            
            <StatusMessage 
                error={error} 
                adminMessage={adminMessage} 
                loading={loading} 
            />
            
            <div className="flex flex-row gap-x-40 items-center">
            <NewsForm 
                newsForm={newsForm}
                setNewsForm={setNewsForm}
                handleSubmitNews={handleSubmitNews}
                loading={loading}
                setError={setError}
            />
            <h1>Hej</h1>
            </div>
            
            
            <p className="text-sm text-gray-500 mt-4">Fler admin funktioner kommer...</p>
        </div>
    );
}