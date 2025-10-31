import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav className="bg-dark-card border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                        >
                            <img
                                src={icon}
                                alt="Crypto Universe"
                                className="w-8 h-8 rounded-lg"
                            />
                            <span className="text-xl font-bold text-white">
                                Crypto Universe
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/')
                                    ? 'bg-accent-blue text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/cryptocurrencies"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/cryptocurrencies')
                                    ? 'bg-accent-blue text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            Cryptocurrencies
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="bg-dark-card hover:bg-gray-700 text-gray-300 hover:text-white p-2 rounded-md transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-card border-t border-gray-700">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                isActive('/')
                                    ? 'bg-accent-blue text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/cryptocurrencies"
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                isActive('/cryptocurrencies')
                                    ? 'bg-accent-blue text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Cryptocurrencies
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
