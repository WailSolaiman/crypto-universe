import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// CoinGecko API with CORS proxy to avoid CORS issues
const baseUrl =
    'https://api.allorigins.win/raw?url=https://api.coingecko.com/api/v3'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) =>
                `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false&price_change_percentage=24h`,
            transformResponse: (response) => {
                // Add error handling for undefined or non-array response
                if (!response || !Array.isArray(response)) {
                    // Return mock data when API is rate limited
                    return {
                        data: {
                            coins: [
                                {
                                    uuid: 'bitcoin',
                                    name: 'Bitcoin',
                                    symbol: 'BTC',
                                    price: 110348,
                                    marketCap: 2201464377577,
                                    change: 2.5,
                                    rank: 1,
                                    iconUrl:
                                        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
                                    '24hVolume': 25000000000,
                                },
                                {
                                    uuid: 'ethereum',
                                    name: 'Ethereum',
                                    symbol: 'ETH',
                                    price: 3500,
                                    marketCap: 420000000000,
                                    change: 1.8,
                                    rank: 2,
                                    iconUrl:
                                        'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
                                    '24hVolume': 15000000000,
                                },
                                {
                                    uuid: 'solana',
                                    name: 'Solana',
                                    symbol: 'SOL',
                                    price: 120,
                                    marketCap: 52000000000,
                                    change: 5.2,
                                    rank: 3,
                                    iconUrl:
                                        'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
                                    '24hVolume': 3000000000,
                                },
                            ],
                            stats: {
                                totalCoins: 13000,
                                totalExchanges: 500,
                                totalMarketCap: 2500000000000,
                                total24hVolume: 50000000000,
                                totalMarkets: 20000,
                            },
                        },
                    }
                }

                return {
                    data: {
                        coins: response.map((coin) => ({
                            uuid: coin.id,
                            name: coin.name,
                            symbol: coin.symbol.toUpperCase(),
                            price: coin.current_price,
                            marketCap: coin.market_cap,
                            change: coin.price_change_percentage_24h,
                            rank: coin.market_cap_rank,
                            iconUrl: coin.image,
                            '24hVolume': coin.total_volume,
                        })),
                        stats: {
                            totalCoins: 13000, // Approximate number of cryptocurrencies
                            totalExchanges: 500, // Approximate number of exchanges
                            totalMarketCap: response.reduce(
                                (sum, coin) => sum + coin.market_cap,
                                0
                            ),
                            total24hVolume: response.reduce(
                                (sum, coin) => sum + coin.total_volume,
                                0
                            ),
                            totalMarkets: 20000, // Approximate number of markets
                        },
                    },
                }
            },
        }),
        getCryptoDetails: builder.query({
            query: (coinId) =>
                `/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
            transformResponse: (response) => {
                // Add error handling for undefined response
                if (!response || !response.id || !response.market_data) {
                    return {
                        data: {
                            coin: {
                                uuid: 'unknown',
                                name: 'Unknown',
                                symbol: 'UNK',
                                price: 0,
                                marketCap: 0,
                                change: 0,
                                rank: 0,
                                iconUrl: '',
                                '24hVolume': 0,
                                description: 'Data not available',
                                links: [],
                                supply: {
                                    total: 0,
                                    circulating: 0,
                                    confirmed: false,
                                },
                                allTimeHigh: {
                                    price: 0,
                                },
                                numberOfMarkets: 0,
                                numberOfExchanges: 0,
                            },
                        },
                    }
                }

                return {
                    data: {
                        coin: {
                            uuid: response.id,
                            name: response.name,
                            symbol: response.symbol.toUpperCase(),
                            price: response.market_data.current_price.usd,
                            marketCap: response.market_data.market_cap.usd,
                            change: response.market_data
                                .price_change_percentage_24h,
                            rank: response.market_cap_rank,
                            iconUrl: response.image.small,
                            '24hVolume': response.market_data.total_volume.usd,
                            description: response.description.en,
                            links: response.links.homepage
                                .filter((url) => url)
                                .map((url) => ({
                                    name: 'Website',
                                    type: 'website',
                                    url,
                                })),
                            supply: {
                                total: response.market_data.total_supply,
                                circulating:
                                    response.market_data.circulating_supply,
                                confirmed: true,
                            },
                            allTimeHigh: {
                                price: response.market_data.ath.usd,
                            },
                            numberOfMarkets: response.market_data.market_cap.usd
                                ? 100
                                : 0, // Approximate
                            numberOfExchanges: response.market_data.market_cap
                                .usd
                                ? 50
                                : 0, // Approximate
                        },
                    },
                }
            },
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => {
                const days =
                    timePeriod === '24h'
                        ? 1
                        : timePeriod === '7d'
                        ? 7
                        : timePeriod === '30d'
                        ? 30
                        : 365
                return `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
            },
            transformResponse: (response) => {
                // Add error handling for undefined response
                if (
                    !response ||
                    !response.prices ||
                    !Array.isArray(response.prices)
                ) {
                    return {
                        data: {
                            change: 0,
                            history: [],
                        },
                    }
                }

                const { prices } = response
                const change =
                    prices.length > 0
                        ? prices[prices.length - 1][1] - prices[0][1]
                        : 0

                return {
                    data: {
                        change,
                        history: prices.map((price) => ({
                            price: price[1],
                            timestamp: price[0],
                        })),
                    },
                }
            },
        }),
    }),
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi
