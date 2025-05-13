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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg font-bodoni h-lvh">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        {article.title}
      </h1>
      <img
        src={article.contentImage}
        alt={article.title}
        className="w-full h-auto max-w-sm sm:max-w-lg shadow-md mb-4 sm:mb-6 mx-auto"
      />
      <p className="text-gray-500 text-xs sm:text-sm mb-4 text-center">
        Publicerad: {new Date(article.date).toLocaleDateString()}
      </p>
      <div className="text-base sm:text-lg text-gray-700 leading-relaxed space-y-4 break-words">
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}