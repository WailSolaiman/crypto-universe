import { Col, Row, Statistic } from 'antd'
import millify from 'millify'
import React from 'react'

const GlobalStats = ({ globalStats, span = 12 }) => {
    return (
        <Row>
            <Col span={span}>
                <Statistic
                    title="Total Cryptocurrencies"
                    value={globalStats.totalCoins}
                />
            </Col>
            <Col span={span}>
                <Statistic
                    title="Total Exchanges"
                    value={millify(globalStats.totalExchanges)}
                />
            </Col>
            <Col span={span}>
                <Statistic
                    title="Total Market Cap"
                    value={millify(globalStats.totalMarketCap)}
                />
            </Col>
            <Col span={span}>
                <Statistic
                    title="Total 24h Volume"
                    value={millify(globalStats.total24hVolume)}
                />
            </Col>
            <Col span={span}>
                <Statistic
                    title="Total Markets"
                    value={millify(globalStats.totalMarkets)}
                />
            </Col>
        </Row>
    )
}

export default GlobalStats
