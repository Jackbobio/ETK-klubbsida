import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import NewsblockSideImage from "./NewsblockSideImage";

// NewsListColumn component for paginated column view of news
export default function NewsListColumn({ news }) {
    const [page, setPage] = useState(0);
    const pageSize = 10;
    const start = page * pageSize;
    const end = start + pageSize;
    const paginatedNews = news.slice(start, end);
    const hasNext = end < news.length;
    const hasPrev = page > 0;

    return (
        <div className="mt-10 flex flex-col items-center">
            <div className="w-full max-w-2xl flex flex-col gap-4">
                {paginatedNews.map((item, idx) => (
                    <NewsblockSideImage
                        key={item._id || idx}
                        coverImage={item.coverpage}
                        date={item.date}
                        title={item.title}
                        link={item.link}
                        id={item._id}
                    />
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPage(page - 1)}
                    disabled={!hasPrev}
                >
                    Föregående
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPage(page + 1)}
                    disabled={!hasNext}
                >
                    Nästa
                </button>
            </div>
        </div>
    );
}

NewsListColumn.propTypes = {
    news: PropTypes.array.isRequired,
};