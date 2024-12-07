import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    TradingView: any
  }
}

let tvScriptLoadingPromise: Promise<void>

export default function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null)
  const onLoadScriptRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve as () => void

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    )

    return () => {
      onLoadScriptRef.current = null
    }
  }, [])

  function createWidget() {
    if (container.current && 'TradingView' in window) {
      new (window as any).TradingView.widget({
        width: '100%',
        height: 500,
        symbol: 'BINANCE:BTCUSDT',
        interval: '30',
        timezone: 'Asia/Shanghai',
        theme: 'light',
        style: '1',
        locale: 'zh_CN',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: container.current.id,
      })
    }
  }

  return (
    <div className="relative w-full" style={{ height: '600px' }}>
      <div
        id="tradingview-widget"
        ref={container}
        className="absolute inset-0 rounded-xl overflow-hidden"
      />
    </div>
  )
}
