import { NextApiRequest, NextApiResponse } from 'next'
import Binance from 'binance-api-node'

// 创建Binance API客户端
const client = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
  // 使用测试网络
  baseUrl: 'https://testnet.binance.vision',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { strategy, symbol, amount } = req.body

    console.log('Starting trading with params:', { strategy, symbol, amount })

    // 获取账户信息
    const accountInfo = await client.accountInfo()
    console.log('Account Info:', accountInfo)

    // 获取交易对价格信息
    const tickerPrice = await client.prices()
    console.log('All Prices:', tickerPrice)
    
    const currentPrice = parseFloat(tickerPrice[symbol])
    console.log('Current Price for', symbol, ':', currentPrice)

    if (!currentPrice) {
      throw new Error(`Unable to get price for symbol: ${symbol}`)
    }

    // 计算可以购买的数量
    const quantity = parseFloat((parseFloat(amount) / currentPrice).toFixed(6))
    console.log('Calculated quantity:', quantity)

    // 根据不同策略执行交易
    switch (strategy) {
      case 'grid':
        // 网格交易策略
        const gridResult = await executeGridStrategy(symbol, quantity)
        return res.status(200).json(gridResult)

      case 'ma':
        // 均线策略
        const maResult = await executeMAStrategy(symbol, quantity)
        return res.status(200).json(maResult)

      case 'rsi':
        // RSI策略
        const rsiResult = await executeRSIStrategy(symbol, quantity)
        return res.status(200).json(rsiResult)

      default:
        throw new Error('Invalid strategy')
    }
  } catch (error) {
    console.error('Trading error:', error)
    return res.status(500).json({ 
      message: 'Trading failed',
      error: error.message 
    })
  }
}

// 网格交易策略
async function executeGridStrategy(symbol: string, quantity: number) {
  try {
    // 获取市场深度
    const depth = await client.book({ symbol })
    console.log('Market Depth:', depth)

    // 这里实现网格交易逻辑
    const order = await client.order({
      symbol: symbol,
      side: 'BUY',
      type: 'LIMIT',
      quantity: quantity.toString(),
      price: depth.bids[0].price,
      timeInForce: 'GTC'
    })

    return {
      strategy: 'grid',
      order: order
    }
  } catch (error) {
    throw new Error(`Grid strategy failed: ${error.message}`)
  }
}

// 均线策略
async function executeMAStrategy(symbol: string, quantity: number) {
  try {
    // 获取K线数据
    const candles = await client.candles({
      symbol: symbol,
      interval: '1h',
      limit: 20
    })

    // 这里实现均线策略逻辑
    const ma20 = calculateMA(candles, 20)
    console.log('MA20:', ma20)

    return {
      strategy: 'ma',
      ma20: ma20
    }
  } catch (error) {
    throw new Error(`MA strategy failed: ${error.message}`)
  }
}

// RSI策略
async function executeRSIStrategy(symbol: string, quantity: number) {
  try {
    // 获取K线数据
    const candles = await client.candles({
      symbol: symbol,
      interval: '1h',
      limit: 14
    })

    // 这里实现RSI策略逻辑
    const rsi = calculateRSI(candles)
    console.log('RSI:', rsi)

    return {
      strategy: 'rsi',
      rsi: rsi
    }
  } catch (error) {
    throw new Error(`RSI strategy failed: ${error.message}`)
  }
}

// 计算移动平均线
function calculateMA(candles: any[], period: number): number {
  const closes = candles.map(candle => parseFloat(candle.close))
  const sum = closes.slice(-period).reduce((a, b) => a + b, 0)
  return sum / period
}

// 计算RSI
function calculateRSI(candles: any[]): number {
  const closes = candles.map(candle => parseFloat(candle.close))
  let gains = 0
  let losses = 0

  for (let i = 1; i < closes.length; i++) {
    const difference = closes[i] - closes[i - 1]
    if (difference >= 0) {
      gains += difference
    } else {
      losses -= difference
    }
  }

  const averageGain = gains / 14
  const averageLoss = losses / 14
  const relativeStrength = averageGain / averageLoss
  const rsi = 100 - (100 / (1 + relativeStrength))

  return rsi
}
