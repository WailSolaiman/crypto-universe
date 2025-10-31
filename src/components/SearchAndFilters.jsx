import React from 'react'

const SearchAndFilters = ({
    searchTerm,
    setSearchTerm,
    marketCapFilter,
    setMarketCapFilter,
    priceChangeFilter,
    setPriceChangeFilter,
    filteredCryptosCount,
}) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                    All Cryptocurrencies
                </h2>
                <div className="text-gray-400 text-sm">
                    {filteredCryptosCount} coins
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
                        onChange={(e) => setMarketCapFilter(e.target.value)}
                        className="bg-dark-card border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue transition-colors"
                    >
                        <option value="all">All Market Caps</option>
                        <option value="large">Large Cap ({'>'}$1B)</option>
                        <option value="medium">Medium Cap ($100M-$1B)</option>
                        <option value="small">Small Cap ({'<'}$100M)</option>
                    </select>

                    {/* Price Change Filter */}
                    <select
                        value={priceChangeFilter}
                        onChange={(e) => setPriceChangeFilter(e.target.value)}
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
    )
}

export default SearchAndFilters
