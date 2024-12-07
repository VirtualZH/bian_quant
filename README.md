# 币安自动交易系统

这是一个基于Next.js和Vercel部署的币安自动交易系统，支持多种交易策略和实时市场监控。

## 功能特点

- 实时价格监控（集成TradingView图表）
- 多种交易策略支持（网格交易、均线策略、RSI策略）
- 实时投资组合监控
- 交易历史记录
- 响应式设计，支持移动端访问

## 技术栈

- Next.js
- TypeScript
- Chakra UI
- Binance API
- TradingView Widget
- React Query
- SWR

## 本地开发

1. 克隆项目
```bash
git clone [项目地址]
cd watch_program
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
复制 `.env.local.example` 文件为 `.env.local` 并填写必要的配置：
- BINANCE_API_KEY
- BINANCE_API_SECRET

4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

## Vercel部署

1. Fork 这个仓库
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署

## 使用说明

1. 访问网站并连接您的币安账户
2. 在交易面板中选择：
   - 交易对
   - 交易策略
   - 投资金额
3. 点击"启动交易"开始自动交易
4. 在投资组合概览中监控您的交易表现
5. 在交易历史中查看详细的交易记录

## 安全说明

- API密钥应该妥善保管，建议只开启交易权限
- 建议先使用测试网进行测试
- 定期检查交易记录和账户余额

## 注意事项

- 该系统仅供学习和参考
- 请注意风险控制，不要投入超过承受能力的资金
- 建议先在测试环境中熟悉系统功能
- 系统不对任何交易损失负责

## 贡献指南

欢迎提交Pull Request或Issue来改进这个项目。
