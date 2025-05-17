import React from 'react';

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-full p-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-grey-500 border-solid"></div>
        </div>
    );
}
