import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { Loader } from './index'

const demoImage =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data } = useGetCryptosQuery(100)
    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    })

    if (!cryptoNews?.value) return <Loader />

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Title level={1}>Cryptocurrencies Latest News</Title>
                    <Title level={3}>
                        Select a cryptocurrency to get started
                    </Title>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        defaultValue="Cryptocurrency"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency) => (
                            <Option value={currency.name} key={currency.uuid}>
                                {currency.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={12} xl={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-container">
                                <div className="news-image-container">
                                    <Title className="news-title" level={3}>
                                        {news.name}
                                    </Title>
                                    <img
                                        src={
                                            news?.image?.thumbnail
                                                ?.contentUrl || demoImage
                                        }
                                        alt=""
                                    />
                                </div>
                                <p>
                                    {news.description.length > 300
                                        ? `${news.description.substring(
                                              0,
                                              300
                                          )}...`
                                        : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar
                                            src={
                                                news.provider[0]?.image
                                                    ?.thumbnail?.contentUrl ||
                                                demoImage
                                            }
                                            alt=""
                                        />
                                        <Text className="provider-name">
                                            {news.provider[0]?.name}
                                        </Text>
                                    </div>
                                    <Text>
                                        <b>Published:</b>{' '}
                                        {moment(news.datePublished)
                                            .startOf('ss')
                                            .fromNow()}
                                    </Text>
                                </div>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
