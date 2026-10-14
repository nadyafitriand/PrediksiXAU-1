const mockData = {
  dashboard: {
    currentPrice: 4162.30,
    forecastPrice: 4215.80,
    change: 0.84,
    forecastChange: 1.29,
    sentimentScore: 0.18,
    newsCount: 1248,
    recommendation: 'HOLD',
    confidence: 78,
    economicCondition: 'Moderate'
  },
  goldHistory: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    prices: [3325, 3378, 3495, 3650, 3820, 4055, 4162]
  },
  forecast: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    actual: [3325, 3378, 3495, 3650, 3820, 4055, 4162, null],
    predicted: [null, null, null, null, null, null, 4162, 4215]
  },
  sentiment: {
    labels: ['26 Sep', '27 Sep', '28 Sep', '29 Sep', '30 Sep', '1 Oct', '2 Oct'],
    scores: [-0.12, 0.05, 0.28, 0.12, -0.08, 0.21, 0.18]
  },
  news: [
    { time: '16:47', title: 'Fed officials discuss the outlook for inflation and interest rates', category: 'FED/FOMC', sentiment: 'Neutral' },
    { time: '15:29', title: 'US employment data shows mixed signals for the market', category: 'JOBS/NFP', sentiment: 'Negative' },
    { time: '13:10', title: 'Consumer prices remain a key focus for investors', category: 'INFLATION', sentiment: 'Negative' },
    { time: '11:42', title: 'Treasury yields move higher as markets assess rate outlook', category: 'TREASURY', sentiment: 'Negative' },
    { time: '10:25', title: 'Gold remains supported amid economic uncertainty', category: 'MARKET', sentiment: 'Positive' },
    { time: '09:18', title: 'Markets await upcoming economic releases', category: 'ECONOMY', sentiment: 'Neutral' }
  ]
};
