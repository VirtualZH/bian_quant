import { FaHistory } from 'react-icons/fa'

interface Trade {
  id: string
  timestamp: string
  pair: string
  type: 'buy' | 'sell'
  price: number
  amount: number
  strategy: string
}

export default function TradeHistory() {
  // 模拟数据
  const trades: Trade[] = [
    {
      id: '1',
      timestamp: '2023-12-07 14:30:00',
      pair: 'BTC/USDT',
      type: 'buy',
      price: 43250.50,
      amount: 0.1,
      strategy: 'Grid Trading'
    },
    {
      id: '2',
      timestamp: '2023-12-07 14:15:00',
      pair: 'ETH/USDT',
      type: 'sell',
      price: 2280.75,
      amount: 1.5,
      strategy: 'MA Strategy'
    },
    {
      id: '3',
      timestamp: '2023-12-07 14:00:00',
      pair: 'BNB/USDT',
      type: 'buy',
      price: 235.40,
      amount: 5,
      strategy: 'RSI Strategy'
    }
  ]

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6 text-primary-600 dark:text-primary-400">
        <FaHistory className="text-xl" />
        <h2 className="text-xl font-bold">交易历史</h2>
      </div>

      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">时间</th>
              <th className="table-header-cell">交易对</th>
              <th className="table-header-cell">类型</th>
              <th className="table-header-cell">价格</th>
              <th className="table-header-cell">数量</th>
              <th className="table-header-cell">策略</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {trades.map((trade) => (
              <tr key={trade.id} className="table-row">
                <td className="table-cell">{trade.timestamp}</td>
                <td className="table-cell font-medium">{trade.pair}</td>
                <td className="table-cell">
                  <span className={`badge ${
                    trade.type === 'buy' ? 'badge-success' : 'badge-error'
                  }`}>
                    {trade.type === 'buy' ? '买入' : '卖出'}
                  </span>
                </td>
                <td className="table-cell">${trade.price.toLocaleString()}</td>
                <td className="table-cell">{trade.amount}</td>
                <td className="table-cell text-gray-500">{trade.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
