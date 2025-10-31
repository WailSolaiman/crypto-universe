import React, { useState, useMemo } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApiCoinLore'
import { Loader, CryptoCard, SearchAndFilters } from './index'

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
                <SearchAndFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    marketCapFilter={marketCapFilter}
                    setMarketCapFilter={setMarketCapFilter}
                    priceChangeFilter={priceChangeFilter}
                    setPriceChangeFilter={setPriceChangeFilter}
                    filteredCryptosCount={filteredCryptos.length}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCryptos.map((currency) => (
                    <CryptoCard key={currency.uuid} currency={currency} />
                ))}
            </div>
        </div>
    )
}

export default Cryptocurrencies
