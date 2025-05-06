import React from 'react';


export default function Membership({
    prices,
}) {
    return (
        <div className="membership">
            <h1 className='p-4'>Medlemskap</h1>
            <p className='p-4'>Gå med i klubben!</p>
            <p className='px-4'>Pris Medlemskap:{prices.item.Membership}</p>
        </div>
    )
}