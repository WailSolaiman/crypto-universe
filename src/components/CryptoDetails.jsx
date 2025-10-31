import { useParams } from 'react-router-dom'
import millify from 'millify'
import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from '../services/cryptoApiCoinLore'
import {
    LineChart,
    Loader,
    CoinHeader,
    StatsCard,
    DescriptionAndLinks,
} from './index'

const CryptoDetails = () => {
    const { coinId } = useParams()
    // Set default time period to 1 year and remove time period selector
    const timePeriod = '1y'
    const { data, isFetching, error } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory, isFetching: isHistoryFetching } =
        useGetCryptoHistoryQuery({
            coinId,
            timePeriod,
        })
    const cryptoDetails = data?.data?.coin

    console.log('CryptoDetails Debug:', { coinId, data, error, cryptoDetails })

    if (isFetching) return <Loader />

    // Add error handling for undefined data
    if (error || !cryptoDetails) {
        return (
            <div className="text-center p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                    Error Loading Data
                </h3>
                <p className="text-gray-300">
                    Unable to load cryptocurrency data. Please try again later.
                </p>
                <p className="text-gray-400 text-sm mt-2">Coin ID: {coinId}</p>
                {error && (
                    <p className="text-gray-400 text-sm mt-2">
                        Error: {error.message || 'Unknown error'}
                    </p>
                )}
            </div>
        )
    }

    const stats = [
        {
            title: 'Price to USD',
            value: `$ ${
                cryptoDetails?.price ? millify(cryptoDetails.price) : 'N/A'
            }`,
        },
        {
            title: 'Rank',
            value: cryptoDetails?.rank || 'N/A',
        },
        {
            title: '24h Volume',
            value: `$ ${
                cryptoDetails?.['24hVolume']
                    ? millify(cryptoDetails['24hVolume'])
                    : 'N/A'
            }`,
        },
        {
            title: 'Market Cap',
            value: `$ ${
                cryptoDetails?.marketCap
                    ? millify(cryptoDetails.marketCap)
                    : 'N/A'
            }`,
        },
        {
            title: 'All-time-high(daily avg.)',
            value: `$ ${
                cryptoDetails?.allTimeHigh?.price
                    ? millify(cryptoDetails.allTimeHigh.price)
                    : 'N/A'
            }`,
        },
    ]

    const genericStats = [
        {
            title: 'Number Of Markets',
            value: cryptoDetails?.numberOfMarkets || 'N/A',
        },
        {
            title: 'Number Of Exchanges',
            value: cryptoDetails?.numberOfExchanges || 'N/A',
        },
        {
            title: 'Approved Supply',
            value: cryptoDetails?.supply?.confirmed ? 'Yes' : 'No',
        },
        {
            title: 'Total Supply',
            value: `$ ${
                cryptoDetails?.supply?.total
                    ? millify(cryptoDetails.supply.total)
                    : 'N/A'
            }`,
        },
        {
            title: 'Circulating Supply',
            value: `$ ${
                cryptoDetails?.supply?.circulating
                    ? millify(cryptoDetails.supply.circulating)
                    : 'N/A'
            }`,
        },
    ]

    return (
        <div className="space-y-8">
            {/* Coin Header */}
            <CoinHeader cryptoDetails={cryptoDetails} />

            {/* Chart */}
            {isHistoryFetching ? (
                <div className="bg-dark-card p-8 rounded-lg border border-gray-700 text-center">
                    <Loader />
                    <p className="text-gray-300 mt-4">Loading chart data...</p>
                </div>
            ) : (
                <LineChart
                    coinHistory={coinHistory}
                    currentPrice={millify(cryptoDetails?.price)}
                    coinName={cryptoDetails?.name}
                />
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Value Statistics */}
                <StatsCard
                    title={`${cryptoDetails.name} Value Statistics`}
                    description={`An overview showing the statistics of ${cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.`}
                    stats={stats}
                />

                {/* Other Stats */}
                <StatsCard
                    title="Other Stats Info"
                    description={`An overview showing the statistics of ${cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.`}
                    stats={genericStats}
                />
            </div>

            {/* Description and Links */}
            <DescriptionAndLinks cryptoDetails={cryptoDetails} />
        </div>
    )
}

export default CryptoDetails
