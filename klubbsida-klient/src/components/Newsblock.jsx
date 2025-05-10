import React from 'react';

export default function Newsblock({ coverImage, date, title, link }) {
  return (
    <div className="flex flex-col gap-3 pt-5 max-xl:">
      <img src={coverImage} alt="News" className="w-full h-auto" />
      <div className="p-4">
        <p className="text-gray-600">{date}</p>
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href={link} className="text-blue-500 hover:underline">
          Läs mer
        </a>
      </div>
    </div>
  );
}