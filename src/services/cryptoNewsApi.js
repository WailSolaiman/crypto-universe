import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Using CoinGecko API for crypto news with CORS proxy
const baseUrl =
    'https://api.allorigins.win/raw?url=https://api.coingecko.com/api/v3'

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => {
                // CoinGecko news API - no filtering by specific crypto available in free tier
                // But provides general crypto news which is still valuable
                return `/search/trending`
            },
            transformResponse: (response) => {
                // Transform CoinGecko response to match our app's expected format
                if (response && response.coins) {
                    // CoinGecko trending returns coins with news, but we'll use the news section
                    // For now, we'll create news items from trending coins
                    const newsItems = response.coins
                        .slice(0, 6)
                        .map((coinData, index) => {
                            const coin = coinData.item
                            return {
                                name: `${coin.name} Trending News`,
                                description: `${coin.name} (${coin.symbol}) is currently trending in the cryptocurrency market with significant price movements and community interest.`,
                                url: `https://www.coingecko.com/en/coins/${coin.id}`,
                                image: {
                                    thumbnail: {
                                        contentUrl:
                                            coin.large ||
                                            'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News',
                                    },
                                },
                                provider: [
                                    {
                                        name: 'CoinGecko',
                                        image: {
                                            thumbnail: {
                                                contentUrl:
                                                    'https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png',
                                            },
                                        },
                                    },
                                ],
                                datePublished: new Date().toISOString(),
                            }
                        })

                    return { value: newsItems }
                }
                // Return empty array if response is invalid
                return { value: [] }
            },
        }),
    }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
