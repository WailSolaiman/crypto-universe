import React from 'react'

const StatsCard = ({ title, description, stats }) => {
    return (
        <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-300 mb-6">{description}</p>
            <div className="space-y-4">
                {stats.map(({ title: statTitle, value }, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-gray-700"
                    >
                        <span className="text-gray-400">{statTitle}</span>
                        <span className="text-white font-semibold">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatsCard
