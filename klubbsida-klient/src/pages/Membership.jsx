import React, { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../utils/api';


export default function Membership({
}) {
    const [prices, setPrices] = useState([]);
    const { get } = useApi();

    useEffect(() => {
        const handleGetPrices = async () => {
            try {
                const response = await get('/prices');
                console.log(response);
                setPrices(response);
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        }

        handleGetPrices();
        // Fetch prices when the component mounts
    }, [get]); // Add get to the dependency array

    const medlemskapsPris = prices.find(price => price.item === 'membership-fee')?.price || "Okänt"; // Default to 0 if not found
    // Fetch prices when the component mounts
    console.log(medlemskapsPris);
    return (
        <div className="membership">
            <h1 className='p-4'>Medlemskap</h1>
            <p className='p-4'>Gå med i klubben!</p>
            <p className='px-4'>Pris Medlemskap: {medlemskapsPris}</p>
        </div>
    )
}