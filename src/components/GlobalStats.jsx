import millify from 'millify'

const GlobalStats = ({ globalStats }) => {
    if (!globalStats) {
        return <div className="text-gray-300">Loading global statistics...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-dark-card p-4 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm mb-2">
                    Total Cryptocurrencies
                </h3>
                <p className="text-white text-xl font-bold">
                    {globalStats.totalCoins || 0}
                </p>
            </div>
            <div className="bg-dark-card p-4 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm mb-2">Total Exchanges</h3>
                <p className="text-white text-xl font-bold">
                    {millify(globalStats.totalExchanges || 0)}
                </p>
            </div>
            <div className="bg-dark-card p-4 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm mb-2">Total Market Cap</h3>
                <p className="text-white text-xl font-bold">
                    ${millify(globalStats.totalMarketCap || 0)}
                </p>
            </div>
            <div className="bg-dark-card p-4 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm mb-2">Total 24h Volume</h3>
                <p className="text-white text-xl font-bold">
                    ${millify(globalStats.total24hVolume || 0)}
                </p>
            </div>
            <div className="bg-dark-card p-4 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm mb-2">Total Markets</h3>
                <p className="text-white text-xl font-bold">
                    {millify(globalStats.totalMarkets || 0)}
                </p>
            </div>
        </div>
    )
}

export default GlobalStats
