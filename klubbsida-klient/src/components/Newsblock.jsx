import React from 'react';
import { useEffect } from 'react';
import { format } from 'date-fns';
import AnimatedLink from './ui/AnimatedLink';
import PropTypes from 'prop-types';
import AOS from 'aos';

export default function Newsblock({ coverImage, date, title, id, aos }) {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div data-aos={aos} className="flex flex-col gap-3 pt-5 max-xl:">
      <img src={coverImage} alt="News" className="w-full h-auto" />
      <div className="p-2">
        <p className="text-gray-600">{format(new Date(date), 'd-MM-y')}</p> 
        <h2 className="text-2xl font-bold pl-2">{title}</h2>
        <AnimatedLink to={`/Artikel/${id}`} color="amber-700">
          Läs mer
        </AnimatedLink>
      </div>
    </div>
  );
}

Newsblock.propTypes = {
  coverImage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};