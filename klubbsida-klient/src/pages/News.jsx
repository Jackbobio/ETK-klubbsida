import { useState } from 'react';
import { PropTypes } from 'prop-types';
import React from 'react';
import Newsblock from '../components/Newsblock';
import { useEffect } from 'react';
import { useApi } from '../utils/api';


export default function News(
) {
    const { get } = useApi();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        handleFetchNews();
    }, []);

    const handleFetchNews = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await get('/news');
            console.log('News request successful:', response);
            setNews(response);
        } catch (err) {
            setError('Failed to request news. ' + err.message);
            console.error('News request error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
        <div className="font-bodoni">
            {news.map((item, index) => (
            <div key={index} className="flex flex-row items-center justify-center gap-10 pt-5 max-w-6xl">
                <Newsblock
                    coverImage={item.coverImage}
                    date={item.date}
                    title={item.title}
                    link={item.link} 
                />
            </div>
            ))}
        </div>
        </>
    )
}