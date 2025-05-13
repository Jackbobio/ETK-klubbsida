import React from 'react';
import { format } from 'date-fns';

export default function Newsblock({ coverImage, date, title, link }) {
  return (
    <div className="flex flex-col gap-3 pt-5 max-xl:">
      <img src={coverImage} alt="News" className="w-full h-auto" />
      <div className="p-2">
        <p className="text-gray-600">{format(new Date(date), 'd-MM-y')}</p>
        <h2 className="text-2xl font-bold pl-2">{title}</h2>
        <a href={link} className="text-amber-700 hover:text-amber-500 hover:cursor-pointer">
          Läs mer
        </a>
      </div>
    </div>
  );
}