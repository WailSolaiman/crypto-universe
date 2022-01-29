import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    BulbOutlined,
    FundOutlined,
    MenuOutlined,
} from '@ant-design/icons'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loader, GlobalStats } from './index'
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)
    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 768) setActiveMenu(false)
        else setActiveMenu(true)
    }, [screenSize])

    if (isFetching) return <Loader />

    return (
        <div className="nav-container">
            <div className="logo-container">
                <div className="logo-title-container">
                    <Avatar src={icon} size={128} shape="square" />
                    <Typography.Title level={2} className="logo">
                        <Link to="/">Crypto Universe</Link>
                    </Typography.Title>
                    <Button
                        className="menu-control-container"
                        onClick={() => setActiveMenu(!activeMenu)}
                    >
                        <MenuOutlined />
                    </Button>
                </div>
                {activeMenu && (
                    <Menu theme="dark">
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FundOutlined />}>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<BulbOutlined />}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                    </Menu>
                )}
                {screenSize < 1200 ? null : (
                    <GlobalStats globalStats={globalStats} span={24} />
                )}
            </div>
        </div>
    )
}

export default Navbar
