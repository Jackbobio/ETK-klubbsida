import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function NewsblockSideImage({ coverImage, date, title, link, id }) {
    return (
        <div className="flex items-center border rounded-lg p-3 gap-4 max-h-[160px] overflow-hidden bg-white transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">{format(new Date(date), 'd-MM-y')}</div>
                <div className="font-semibold text-lg truncate">{title}</div>
                {id && (
                    <Link to={`/Artikel/${id}`} className="text-amber-700 text-sm" target="_blank" rel="noopener noreferrer">
                        Läs mer
                    </Link>
                )}
            </div>
            {coverImage && (
                <img
                    src={coverImage}
                    alt={title}
                    className="object-cover rounded max-h-[90px] w-auto max-w-[120px]"
                    style={{ maxHeight: '90px', maxWidth: '120px' }}
                />
            )}
        </div>
    );
}

NewsblockSideImage.propTypes = {
    coverImage: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    id: PropTypes.any,
};
