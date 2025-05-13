import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../utils/api';

export default function ArticlePage() {
  const { id } = useParams(); // Get the article ID from the URL
  const { get } = useApi();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <div className="text-center">Laddar...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <img src={article.coverpage} alt={article.title} className="w-full h-auto mb-4" />
      <p className="text-gray-600 mb-4">{new Date(article.date).toLocaleDateString()}</p>
      <p className="text-lg">{article.content}</p>
    </div>
  );
}