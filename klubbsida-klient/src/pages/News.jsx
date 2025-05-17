import { useState } from 'react';
import React from 'react';
import Newsblock from '../components/Newsblock';
import NewsListColumn from '../components/NewsListColumn';
import { useEffect } from 'react';
import { useApi } from '../utils/api';
import Spinner from '../components/Spinner';


export default function News(
) {
    const { get } = useApi();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleFetchNews();
    }, []);

    const handleFetchNews = async () => {
        setLoading(true);

        try {
            const response = await get('/news');
            console.log('News request successful:', response);
            setNews(response);
        } catch (err) {
            console.error('News request error:', err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
        <div className="font-bodoni">
            {loading ? (
                <Spinner />
            ) : (
                <>
                <h1 className='text-center text-5xl font-semibold p-5'>Senaste Nyheterna</h1>
                <div className="flex flex-col p-8 sm:p-0 sm:flex-row items-center justify-between gap-5">
                    {news.slice(0,3).map((item, index) => (
                    <div key={index} className="">
                        <Newsblock
                            coverImage={item.coverpage}
                            date={item.date}
                            title={item.title}
                            link={item.link} 
                            id={item._id}
                        />
                    </div>
                    ))}
                </div>
                {/* NewsListColumn for the rest of the news */}
                <NewsListColumn news={news.slice(3)} />
                </>
            )}
        </div>
        </>
    )
}