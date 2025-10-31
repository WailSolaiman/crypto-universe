import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApiCoinLore'
import { Loader } from './index'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [searchTerm, setSearchTerm] = useState('')
    const [marketCapFilter, setMarketCapFilter] = useState('all')
    const [priceChangeFilter, setPriceChangeFilter] = useState('all')

    // Filter cryptocurrencies based on search and filters
    const filteredCryptos = useMemo(() => {
        if (!cryptosList?.data?.coins) return []

        return cryptosList.data.coins.filter((currency) => {
            // Search filter
            const matchesSearch =
                currency.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())

            // Market cap filter
            let matchesMarketCap = true
            if (marketCapFilter === 'large') {
                matchesMarketCap = currency.marketCap > 1000000000 // > $1B
            } else if (marketCapFilter === 'medium') {
                matchesMarketCap =
                    currency.marketCap >= 100000000 &&
                    currency.marketCap <= 1000000000 // $100M - $1B
            } else if (marketCapFilter === 'small') {
                matchesMarketCap = currency.marketCap < 100000000 // < $100M
            }

            // Price change filter
            let matchesPriceChange = true
            if (priceChangeFilter === 'gainers') {
                matchesPriceChange = parseFloat(currency.change) > 0
            } else if (priceChangeFilter === 'losers') {
                matchesPriceChange = parseFloat(currency.change) < 0
            }

            return matchesSearch && matchesMarketCap && matchesPriceChange
        })
    }, [cryptosList, searchTerm, marketCapFilter, priceChangeFilter])

    if (isFetching) return <Loader />

    return (
        <div className="space-y-4">
            {!simplified && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">
                            All Cryptocurrencies
                        </h2>
                        <div className="text-gray-400 text-sm">
                            {filteredCryptos.length} coins
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search cryptocurrencies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue transition-colors"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Filter Row */}
                        <div className="flex flex-wrap gap-4">
                            {/* Market Cap Filter */}
                            <select
                                value={marketCapFilter}
                                onChange={(e) =>
                                    setMarketCapFilter(e.target.value)
                                }
                                className="bg-dark-card border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue transition-colors"
                            >
                                <option value="all">All Market Caps</option>
                                <option value="large">
                                    Large Cap ({'>'}$1B)
                                </option>
                                <option value="medium">
                                    Medium Cap ($100M-$1B)
                                </option>
                                <option value="small">
                                    Small Cap ({'<'}$100M)
                                </option>
                            </select>

                            {/* Price Change Filter */}
                            <select
                                value={priceChangeFilter}
                                onChange={(e) =>
                                    setPriceChangeFilter(e.target.value)
                                }
                                className="bg-dark-card border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue transition-colors"
                            >
                                <option value="all">All Changes</option>
                                <option value="gainers">Gainers (24h)</option>
                                <option value="losers">Losers (24h)</option>
                            </select>

                            {/* Reset Filters */}
                            {(searchTerm ||
                                marketCapFilter !== 'all' ||
                                priceChangeFilter !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setMarketCapFilter('all')
                                        setPriceChangeFilter('all')
                                    }}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCryptos.map((currency) => (
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
