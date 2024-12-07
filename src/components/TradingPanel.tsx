import { useState, useEffect } from 'react'
import { FaChartLine, FaCoins, FaDollarSign } from 'react-icons/fa'

export default function TradingPanel() {
  const [strategy, setStrategy] = useState('')
  const [symbol, setSymbol] = useState('BTCUSDT')
  const [amount, setAmount] = useState('')

  const handleStartTrading = async () => {
    try {
      const response = await fetch('/api/trading/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strategy,
          symbol,
          amount,
        }),
      })

      if (!response.ok) {
        throw new Error('启动失败')
      }
      
      // 显示成功提示
      alert('交易启动成功')
    } catch (error) {
      // 显示错误提示
      alert(`交易启动失败: ${error.message}`)
    }
  }

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center space-x-2 mb-6 text-primary-600 dark:text-primary-400">
        <FaChartLine className="text-xl" />
        <h2 className="text-xl font-bold">交易设置</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaCoins />
            <span>交易对</span>
          </label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="select"
          >
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="BNBUSDT">BNB/USDT</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaChartLine />
            <span>策略选择</span>
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="select"
          >
            <option value="grid">网格交易</option>
            <option value="ma">均线策略</option>
            <option value="rsi">RSI策略</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FaDollarSign />
            <span>投资金额 (USDT)</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="输入投资金额"
            className="input"
          />
        </div>

        <button
          onClick={handleStartTrading}
          className="btn-primary w-full group"
        >
          <span className="flex items-center justify-center space-x-2">
            <FaChartLine className="transform group-hover:scale-110 transition-transform" />
            <span>启动交易</span>
          </span>
        </button>
      </div>
    </div>
  )
}
