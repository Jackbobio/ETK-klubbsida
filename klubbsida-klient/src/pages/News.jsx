import { PropTypes } from 'prop-types';
import React from 'react';
import Newsblock from '../components/Newsblock';
import { useEffect } from 'react';


export default function News(
) {
    const news = [];

    useEffect(() => {
        handleFetchNews();
    }, []);

    const handleFetchNews = async () => {
        const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXX');
        const data = await response.json();
        news.push(...data);
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