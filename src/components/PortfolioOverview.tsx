import { useState, useEffect } from 'react'
import { FaChartPie, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa'

interface PortfolioStats {
  totalValue: number
  dailyProfit: number
  profitPercentage: number
  activeStrategies: number
}

export default function PortfolioOverview() {
  const [stats, setStats] = useState<PortfolioStats>({
    totalValue: 0,
    dailyProfit: 0,
    profitPercentage: 0,
    activeStrategies: 0,
  })

  useEffect(() => {
    const fetchPortfolioStats = async () => {
      try {
        const response = await fetch('/api/portfolio/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch portfolio stats:', error)
      }
    }

    fetchPortfolioStats()
    const interval = setInterval(fetchPortfolioStats, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6 text-primary-600 dark:text-primary-400">
        <FaChartPie className="text-xl" />
        <h2 className="text-xl font-bold">投资组合概览</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">总资产</span>
            <FaDollarSign className="text-primary-500" />
          </div>
          <div className="text-2xl font-bold">
            ${stats.totalValue.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">今日盈亏</span>
            {stats.dailyProfit >= 0 ? (
              <FaArrowUp className="text-green-500" />
            ) : (
              <FaArrowDown className="text-red-500" />
            )}
          </div>
          <div className={`text-2xl font-bold ${
            stats.dailyProfit >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            ${Math.abs(stats.dailyProfit).toLocaleString()}
            <span className="text-sm ml-1">
              ({stats.profitPercentage}%)
            </span>
          </div>
        </div>

        <div className="stat-card md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              运行中的策略
            </span>
            <span className="badge badge-success">
              {stats.activeStrategies} 个
            </span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(stats.activeStrategies / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
