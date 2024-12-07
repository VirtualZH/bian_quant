import TradingViewWidget from '../components/TradingViewWidget'
import TradingPanel from '../components/TradingPanel'
import PortfolioOverview from '../components/PortfolioOverview'
import TradeHistory from '../components/TradeHistory'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-primary-600 dark:text-primary-400 mb-8 animate-fade-in">
          量化交易控制台
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8 animate-slide-up">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <TradingViewWidget />
            </div>
            <TradingPanel />
          </div>
          
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <PortfolioOverview />
            <TradeHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
