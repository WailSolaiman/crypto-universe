import { Link } from 'react-router-dom'

import { Cryptocurrencies, Loader, GlobalStats } from './index'
import { useGetCryptosQuery } from '../services/cryptoApiCoinLore'

const Homepage = () => {
    const { data, isFetching, error } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats

    if (isFetching) return <Loader />

    if (error) {
        return (
            <div className="text-center p-5">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Connection Error
                </h2>
                <p className="text-gray-300">
                    Unable to load data. Please try again later.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-accent-blue mb-6">
                Global Crypto Stats
            </h2>
            <GlobalStats globalStats={globalStats} />

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                    Top 10 Cryptocurrencies in the world
                </h2>
                <Link
                    to="/cryptocurrencies"
                    className="text-accent-blue hover:text-accent-light transition-colors"
                >
                    Show More →
                </Link>
            </div>
            <Cryptocurrencies simplified />
        </div>
    )
}

export default Homepage
