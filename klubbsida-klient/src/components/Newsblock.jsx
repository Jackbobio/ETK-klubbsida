import React from 'react';

export default function Newsblock({ coverImage, date, title, link }) {
  return (
    <div className="flex flex-row items-center justify-center gap-10 pt-5 max-w-6xl">
      <img src={coverImage} alt="News" className="w-full h-auto" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{date}</p>
        <a href={link} className="text-blue-500 hover:underline">
          Läs mer
        </a>
      </div>
    </div>
  );
}