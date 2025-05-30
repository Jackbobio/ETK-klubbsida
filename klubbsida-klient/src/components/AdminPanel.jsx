import React from 'react';
import { useState, useEffect } from 'react';
import { useApi } from '../utils/api';
import { useAuth0 } from '@auth0/auth0-react';

// Import the new components
import AdminHeader from './admin/AdminHeader';
import StatusMessage from './admin/StatusMessage';
import NewsForm from './admin/NewsForm';
import PricePanel from './admin/PricePanel';

export default function AdminPanel() {
    const [prices, setPrices] = useState([]);
    const [adminMessage, setAdminMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newsForm, setNewsForm] = useState({ title: '', content: '', coverpage: '', contentImage: '' })
    const [editedPrices, setEditedPrices] = useState([]);
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { get, post, put } = useApi();

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

    const handlePricesRequest = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await get('/prices');
            console.log('Price request successful:', response);
            setPrices(response);
            setEditedPrices(response.map(p => ({ ...p })));
        } catch (err) {
            setError('Failed to request price. ' + err.message);
            console.error('Price request error:', err);
        } finally {
            setLoading(false);
        }
    }

    const handlePricesUpdate = async () => {
        setLoading(true);
        setError('');

        try {
            const updates = editedPrices.filter((edited, index) => 
                edited.price !== prices[index].price
            );



            for (const update of updates) {
                await put(`/prices/${update._id}`, { price: update.price });
            }
            setAdminMessage('Prices updated successfully');
            console.log('Price update successful');
        } catch (err) {
            setError('Failed to update price. ' + err.message);
            console.error('Price update error:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start p-6 bg-gray-100 min-h-screen">
            <AdminHeader />
            
            <StatusMessage 
                error={error} 
                adminMessage={adminMessage} 
                loading={loading} 
            />
            
            <div className="flex flex-col sm:flex-row gap-x-10 w-full max-w-4xl">
            <NewsForm 
                newsForm={newsForm}
                setNewsForm={setNewsForm}
                handleSubmitNews={handleSubmitNews}
                loading={loading}
                setError={setError}
            />
            <PricePanel
                prices={prices}
                setEditedPrices={setEditedPrices}
                editedPrices={editedPrices}
                handlePricesRequest={handlePricesRequest}
                handlePricesUpdate={handlePricesUpdate}
                loading={loading}
                setError={setError}
                setAdminMessage={setAdminMessage}
            />
            </div>
            
            
            <p className="text-sm text-gray-500 mt-4">Fler admin funktioner kommer...</p>
        </div>
    );
}