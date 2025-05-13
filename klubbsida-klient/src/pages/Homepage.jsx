import React from 'react';
import { useState, useEffect } from 'react';
import { useApi } from '../utils/api';
import Newsblock from '../components/Newsblock';

export default function  Home() {
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
    <main className="font-bodoni">
        <div className="relative h-screen w-full bg-[url('/images/closeup-tennis-gravel.jpg')] bg-cover bg-center ">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40"></div>
            <div className="text-center relative z-10 text-white p-4 flex flex-col justify-center items-center h-full">
                <h1 className="text-4xl md:text-7xl font-bold mb-4">Ellagårds Tennisklubb</h1>
                <h3 className="text-xl md:text-3xl">-Play tennis, change your life</h3>
                <button className="bg-amber-400 text-gray-800 p-4 mt-8 hover:cursor-pointer hover:bg-amber-300" 
                onClick={() => window.location.href="https://www.matchi.se/facilities/ellagardstk"}>BOKA BANA
                </button>
            </div>
        </div>
        <div className="bg-gray-800 p-10 text-center flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-7 text-white">Vad är Ellagårds Tennisklubb?</h2>
            <p className="text-lg md:text-xl max-w-4xl text-white">Ellagårds Tennisklubb har sedan 1965 bidragit till glädje, samvaro och rekreation i hjärtat av Täby.
            Vi har en fin tennishall med klubbhus, tre hardcourtbanor inne och två nyrenoverade grusbanor ute.</p>
        </div>
        <h2 className="text-center text-5xl font-medium p-8">Nyheter</h2>
        {loading ? (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-grey-500"></div>
            </div>
        ) : error ? (
            <div className="text-center text-red-500 text-lg">{error}</div>
        ) : (
            <div className="flex flex-row items-center justify-center gap-10 pt-5">
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
        )}
        <div className="relative h-screen w-full bg-[url('/images/medium-multiple-tennisplayers.webp')] bg-cover bg-center ">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800/90 to-black/40"></div>
            <div className="text-center relative z-10 text-white p-4 flex flex-col justify-center items-center h-full">
                <h1 className="text-4xl md:text-7xl font-bold mb-4">Juniorträning</h1>
                <h3 className="text-xl md:text-3xl">För alla mellan 6-18 år</h3>
                <button className="bg-amber-400 text-gray-800 p-4 mt-8 hover:cursor-pointer hover:bg-amber-300">ANMÄL HÄR</button>
            </div>
        </div>
    </main>
    </>
    )
}
