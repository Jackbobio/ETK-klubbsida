import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../utils/api';
import { useAuth0 } from '@auth0/auth0-react';

export default function ArticlePage() {
  const { id } = useParams(); // Get the article ID from the URL
  const { get, put, del } = useApi();
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await get(`/news/${id}`); // Fetch article by ID
        setArticle(response);
      } catch (err) {
        setError('Failed to load the article. ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, get]);
    
  useEffect(() => {
    if (!isAuthenticated || !user) return;
        // First check client-side roles (for UI purposes)
        const clientRoles = user["https://dev-nwurgok5vi3aouh3.eu.auth0.com/roles"] || 
                           user["https://localhost:5173/roles"] || [];
                           
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

    const handleUpdate = async () => {
        try {
          setLoading(true);
          await put(`/news/${id}`, { ...article, content: editedArticle });
          setArticle((prev) => ({ ...prev, content: editedArticle }));
          setIsEditing(false);
          alert("Article updated successfully!");
      } catch (err) {
          setError('Failed to update the article. ' + err.message);
      } finally {
          setLoading(false);
      }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
          setLoading(true);
          await del(`/news/${id}`);
          alert("Article deleted successfully!");
          navigate("/Nyheter"); // Redirect to the news list page
      } catch (err) {
          setError('Failed to delete the article. ' + err.message);
      } finally {
          setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center">Laddar...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-screen mx-auto p-4 sm:p-6 bg-white shadow-lg font-bodoni min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        {article.title}
      </h1>
      <img
        src={article.contentImage}
        alt={article.title}
        className="w-full h-auto max-w-3xl sm:max-w-2xl shadow-md mb-4 sm:mb-6 mx-auto"
      />
      <p className="text-gray-500 text-xs sm:text-sm mb-4 text-center">
        Publicerad: {new Date(article.date).toLocaleDateString()}
      </p>
      <div className="text-base sm:text-lg text-gray-700 leading-relaxed space-y-4 break-words font-sans">
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    {isAdmin && (
      <div className="flex flex-col justify-center items-center mt-6 gap-4">
        <p>Admin funktioner</p>
        <div className='flex gap-4'>
          <button
          onClick={() => {
            setIsEditing(true);
            setEditedArticle(article.content);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Redigera
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Ta bort
        </button>
        </div>
        
      </div>
    )}
    {isEditing && (
        <div className="fixed inset-0 bg-gray-800/40 font-sans flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Redigera Artikel</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="10"
              value={editedArticle}
              onChange={(e) => setEditedArticle(e.target.value)}
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Spara
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}