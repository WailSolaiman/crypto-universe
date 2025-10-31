import React from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'

const CryptoCard = ({ currency }) => {
    return (
        <Link
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
                    <span className="text-gray-400">Market Cap:</span>
                    <span className="text-white font-medium">
                        ${millify(currency.marketCap)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Daily Change:</span>
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
    )
}

export default CryptoCard
