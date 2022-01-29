import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Typography } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loader } from './index'

const { Title } = Typography

const Cryptocurrencies = ({ simplified = false }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filtered = cryptosList?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setCryptos(filtered)
    }, [cryptosList, searchTerm])

    if (isFetching) return <Loader />

    return (
        <React.Fragment>
            {!simplified && (
                <div>
                    <Title level={1}>Top 100 Cryptocurrencies</Title>
                    <Title level={3}>
                        Search a specific cryptocurrency to get started
                    </Title>
                    <div className="search-crypto">
                        <Input
                            placeholder="Search Cryptocurrency"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col
                        key={currency.uuid}
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                    >
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.name}`}
                                extra={
                                    <img
                                        className="crypto-image"
                                        src={currency.iconUrl}
                                        alt={currency.name}
                                    />
                                }
                                hoverable
                            >
                                <p>
                                    Rank: <b>{currency.rank}</b>
                                </p>
                                <p>
                                    Symbol: <b>{currency.symbol}</b>
                                </p>
                                <p>
                                    Price: <b>${millify(currency.price)}</b>
                                </p>
                                <p>
                                    Market Cap:{' '}
                                    <b>{millify(currency.marketCap)}</b>
                                </p>
                                <p>
                                    Daily Change:{' '}
                                    <b>{millify(currency.change)}%</b>
                                </p>
                                <p>
                                    24h Volume:{' '}
                                    <b>{millify(currency['24hVolume'])}</b>
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default Cryptocurrencies
