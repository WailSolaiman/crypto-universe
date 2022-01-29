import React from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'

import { Cryptocurrencies, News, Loader, GlobalStats } from './index'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats

    if (isFetching) return <Loader />

    return (
        <React.Fragment>
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            <GlobalStats globalStats={globalStats} />
            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Top 10 Cryptocurrencies in the world
                </Title>
                <Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show More</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Latest Crypto News
                </Title>
                <Title level={3} className="show-more">
                    <Link to="/news">Show More</Link>
                </Title>
            </div>
            <News simplified />
        </React.Fragment>
    )
}

export default Homepage
