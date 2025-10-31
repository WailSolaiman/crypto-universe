import { Routes, Route } from 'react-router-dom'

import { Navbar, Homepage, Cryptocurrencies, CryptoDetails } from './components'
import './App.css'

const App = () => {
    return (
        <div className="app min-h-screen bg-dark-primary">
            <Navbar />
            <div className="main pt-16 min-h-screen">
                <div className="routes p-8 max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route
                            path="/cryptocurrencies"
                            element={<Cryptocurrencies />}
                        />
                        <Route
                            path="/crypto/:coinId"
                            element={<CryptoDetails />}
                        />
                    </Routes>
                </div>
                <div className="footer bg-dark-secondary border-t border-gray-700 py-6">
                    <h5 className="text-white text-center text-sm">
                        Crypto Universe <br /> All rights reserved 2022 -
                        W.Solaiman
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default App
