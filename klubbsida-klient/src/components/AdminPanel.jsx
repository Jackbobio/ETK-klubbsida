import { useState, useEffect } from 'react';
import { useApi } from '../utils/api';
import { useAuth0 } from '@auth0/auth0-react';

export default function AdminPanel() {
    const [adminMessage, setAdminMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newsForm, setNewsForm] = useState({ title: '', content: '' });
    const { isAuthenticated } = useAuth0();
    const { get, post } = useApi();

    // Verify admin access on component mount
    useEffect(() => {
        const verifyAdminAccess = async () => {
            if (!isAuthenticated) return;
            
            setLoading(true);
            setError('');
            
            try {
                const response = await get('/admin');
                setAdminMessage(response.message);
            } catch (err) {
                setError('Failed to verify admin access. Please make sure you have administrator privileges.');
                console.error('Admin verification error:', err);
            } finally {
                setLoading(false);
            }
        };

        verifyAdminAccess();
    }, [isAuthenticated, get]);

    // Handle news form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle news form submission
    const handleSubmitNews = async (e) => {
        e.preventDefault();
        
        if (!newsForm.title || !newsForm.content) {
            setError('Title and content are required');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            await post('/news', newsForm);
            setNewsForm({ title: '', content: '' });
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
            <h1 className="text-4xl font-bold text-green-600 mb-6">Admin Panel</h1>
            
            {loading && <p className="text-gray-600">Loading...</p>}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-2xl">
                    <p>{error}</p>
                </div>
            )}
            
            {adminMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 w-full max-w-2xl">
                    <p>{adminMessage}</p>
                </div>
            )}
            
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Create News Post</h2>
                
                <form onSubmit={handleSubmitNews}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            name="title"
                            value={newsForm.title}
                            onChange={handleInputChange}
                            placeholder="News Title"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            id="content"
                            name="content"
                            value={newsForm.content}
                            onChange={handleInputChange}
                            placeholder="News Content"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create News Post'}
                        </button>
                    </div>
                </form>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">More admin features coming soon...</p>
        </div>
    );
}