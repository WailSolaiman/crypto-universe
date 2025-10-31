import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    if (!coinHistory?.data?.history) {
        return (
            <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-center text-gray-400">
                    Chart data not available
                </div>
            </div>
        )
    }

    const coinPrice = []
    const coinTimestamp = []

    // Extract data from coin history
    for (let i = 0; i < coinHistory.data.history.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price)
        // CoinGecko API returns timestamps in milliseconds, no need to multiply by 1000
        const { timestamp } = coinHistory.data.history[i]
        const date = new Date(timestamp)
        // Format date as "Month Day Year" (e.g., "October 31st 25")
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const day = date.getDate()
        const daySuffix =
            day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'
        const year = date.getFullYear().toString().slice(-2) // Get last 2 digits of year
        coinTimestamp.push(
            `${monthNames[date.getMonth()]} ${day}${daySuffix} ${year}`
        )
    }

    // Calculate price change
    const priceChange = coinHistory.data.change
    const isPositiveChange = parseFloat(priceChange) >= 0

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: isPositiveChange ? '#00d95f' : '#ff3860',
                borderColor: isPositiveChange ? '#00d95f' : '#ff3860',
                tension: 0.1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#cccccc',
                    font: {
                        size: 12,
                    },
                },
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#999999',
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#999999',
                    callback: (value) => {
                        return '$' + value.toLocaleString()
                    },
                },
            },
        },
        maintainAspectRatio: false,
    }

    return (
        <div className="bg-dark-card p-4 md:p-6 rounded-lg border border-gray-700">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 space-y-4 md:space-y-0">
                <h3 className="text-white text-lg md:text-xl font-bold">
                    {coinName} Price Chart
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="bg-dark-primary px-3 py-2 rounded border border-gray-600">
                        <span className="text-gray-400 text-xs md:text-sm">
                            Current:
                        </span>
                        <span className="text-white font-bold ml-1 md:ml-2">
                            ${currentPrice}
                        </span>
                    </div>
                    <div className="bg-dark-primary px-3 py-2 rounded border border-gray-600">
                        <span className="text-gray-400 text-xs md:text-sm">
                            Change:
                        </span>
                        <span
                            className={`font-bold ml-1 md:ml-2 ${
                                isPositiveChange
                                    ? 'text-green-400'
                                    : 'text-red-400'
                            }`}
                        >
                            {priceChange}%
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-48 md:h-64">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default LineChart
