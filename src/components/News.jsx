import React from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { Loader } from './index'

const News = ({ simplified }) => {
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
        newsCategory: 'Cryptocurrency',
        count: simplified ? 6 : 12,
    })

    if (isFetching) return <Loader />

    return (
        <div className="space-y-4">
            {!simplified && (
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Latest Crypto News
                    </h2>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cryptoNews?.value?.map((news, i) => (
                    <div
                        key={i}
                        className="bg-dark-card p-4 rounded-lg border border-gray-700"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-white font-semibold text-lg">
                                {news.name}
                            </h3>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-3">
                            {news.description}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <img
                                    src={
                                        news?.image?.thumbnail?.contentUrl ||
                                        '/placeholder-image.jpg'
                                    }
                                    alt={news.name}
                                    className="w-8 h-8 rounded"
                                />
                                <span className="text-gray-400 text-sm">
                                    {news.provider[0]?.name}
                                </span>
                            </div>
                            <span className="text-gray-400 text-sm">
                                {new Date(
                                    news.datePublished
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-accent-blue hover:text-accent-light transition-colors"
                        >
                            Read more →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News
