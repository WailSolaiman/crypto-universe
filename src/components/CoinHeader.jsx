import React from 'react'

const CoinHeader = ({ cryptoDetails }) => {
    return (
        <div className="bg-dark-card p-8 rounded-lg border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-accent-blue mb-4">
                {cryptoDetails.name} ({cryptoDetails.symbol}) Price
            </h2>
            <img
                src={cryptoDetails.iconUrl}
                alt={cryptoDetails.symbol}
                className="w-20 h-20 rounded-lg mx-auto mb-4"
            />
            <p className="text-gray-300 text-lg">
                {cryptoDetails.name} live price in US Dollar (USD). View value
                statistics, market cap and supply.
            </p>
        </div>
    )
}

export default CoinHeader
