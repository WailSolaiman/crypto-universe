import React from 'react'
import HTMLReactParser from 'html-react-parser'

const DescriptionAndLinks = ({ cryptoDetails }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                    What is {cryptoDetails.name}?
                </h3>
                <div className="text-gray-300 prose prose-invert">
                    {HTMLReactParser(cryptoDetails.description)}
                </div>
            </div>

            {/* Links */}
            <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                    {cryptoDetails.name} Links
                </h3>
                <div className="space-y-3">
                    {cryptoDetails.links?.map((link) => (
                        <div
                            key={link.name}
                            className="flex justify-between items-center py-2"
                        >
                            <span className="text-gray-400">{link.type}</span>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent-blue hover:text-accent-light transition-colors"
                            >
                                {link.name}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DescriptionAndLinks
