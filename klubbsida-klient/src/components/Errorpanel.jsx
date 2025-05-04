import React from 'react';

export default function Errorpanel({ error }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">Något gick fel!</h1>
            <p className="mt-4 text-lg text-gray-700">{error.message}</p>
            <p className="mt-2 text-sm text-gray-500">Försök igen senare.</p>
        </div>
    );
}