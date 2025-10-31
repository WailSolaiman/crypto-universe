import React from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loader } from './index'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

    if (isFetching) return <Loader />

    return (
        <div className="space-y-4">
            {!simplified && (
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        All Cryptocurrencies
                    </h2>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cryptosList?.data?.coins?.map((currency) => (
                    <Link
                        key={currency.uuid}
                        to={`/crypto/${currency.uuid}`}
                        className="bg-dark-card p-4 rounded-lg border border-gray-700 hover:border-accent-blue transition-colors"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={currency.iconUrl}
                                    alt={currency.name}
                                    className="w-8 h-8 rounded"
                                />
                                <div>
                                    <h3 className="text-white font-semibold">
                                        {currency.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {currency.symbol}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Price:</span>
                                <span className="text-white font-medium">
                                    ${millify(currency.price)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">
                                    Market Cap:
                                </span>
                                <span className="text-white font-medium">
                                    ${millify(currency.marketCap)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">
                                    Daily Change:
                                </span>
                                <span
                                    className={`font-medium ${
                                        parseFloat(currency.change) >= 0
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                    }`}
                                >
                                    {currency.change}%
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Cryptocurrencies
