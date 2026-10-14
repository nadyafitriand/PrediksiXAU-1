const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');
const lastUpdate = document.getElementById('last-update');
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

const pageInfo = {
  dashboard: ['Dashboard', 'Ringkasan harga emas, forecast, sentimen, dan keputusan bulanan.'],
  forecast: ['Forecast', 'Prediksi harga/return emas menggunakan XGBoost.'],
  sentiment: ['Sentiment', 'Analisis sentimen berita ekonomi menggunakan FinBERT.'],
  news: ['Economic News', 'Monitor berita ekonomi yang menjadi input analisis.']
};

function showPage(page) {
  navItems.forEach(item => item.classList.toggle('active', item.dataset.page === page));
  pages.forEach(section => section.classList.toggle('active', section.id === page));
  pageTitle.textContent = pageInfo[page][0];
  pageSubtitle.textContent = pageInfo[page][1];
}

navItems.forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));
document.querySelectorAll('[data-page-link]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.pageLink)));

function chartOptions(showLegend = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { display: showLegend, position: 'bottom', labels: { boxWidth: 10, font: { size: 9 } } } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#858990' } },
      y: { grid: { color: '#eceef1' }, ticks: { font: { size: 9 }, color: '#858990' } }
    }
  };
}

const goldChart = new Chart(document.getElementById('goldChart'), {
  type: 'line',
  data: {
    labels: mockData.goldHistory.labels,
    datasets: [{ label: 'Gold Price', data: mockData.goldHistory.prices, borderColor: '#b18a45', backgroundColor: 'rgba(177,138,69,.07)', fill: true, tension: .32, pointRadius: 2, borderWidth: 2 }]
  },
  options: chartOptions(false)
});

new Chart(document.getElementById('forecastChart'), {
  type: 'line',
  data: {
    labels: mockData.forecast.labels,
    datasets: [
      { label: 'Actual', data: mockData.forecast.actual, borderColor: '#555b64', tension: .3, pointRadius: 2, borderWidth: 2 },
      { label: 'Forecast', data: mockData.forecast.predicted, borderColor: '#b18a45', borderDash: [6, 5], tension: .3, pointRadius: 3, borderWidth: 2 }
    ]
  },
  options: chartOptions(true)
});

new Chart(document.getElementById('sentimentChart'), {
  type: 'line',
  data: {
    labels: mockData.sentiment.labels,
    datasets: [{ label: 'Sentiment', data: mockData.sentiment.scores, borderColor: '#555b64', backgroundColor: 'rgba(85,91,100,.05)', fill: true, tension: .3, pointRadius: 2, borderWidth: 2 }]
  },
  options: { ...chartOptions(false), scales: { ...chartOptions(false).scales, y: { ...chartOptions(false).scales.y, suggestedMin: -1, suggestedMax: 1 } } }
});

function renderRecentNews() {
  document.getElementById('recent-news').innerHTML = mockData.news.slice(0, 4).map(item => {
    const cls = `sentiment-${item.sentiment.toLowerCase()}`;
    return `<div class="news-row"><time>${item.time}</time><div><b>${item.title}</b><small>${item.category}</small></div><div class="news-sentiment ${cls}">${item.sentiment}</div></div>`;
  }).join('');
}

function renderNews(news = mockData.news) {
  document.getElementById('news-table').innerHTML = news.map(item => {
    const cls = `sentiment-${item.sentiment.toLowerCase()}`;
    return `<tr><td>${item.time}</td><td>${item.title}</td><td><span class="category">${item.category}</span></td><td class="${cls}">${item.sentiment}</td></tr>`;
  }).join('');
}

function updateDashboard() {
  const d = mockData.dashboard;
  document.getElementById('current-price').textContent = `$${d.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  document.getElementById('forecast-price').textContent = `$${d.forecastPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  document.getElementById('price-change').textContent = `${d.change >= 0 ? '+' : ''}${d.change.toFixed(2)}%`;
  document.getElementById('forecast-change').textContent = `${d.forecastChange >= 0 ? '+' : ''}${d.forecastChange.toFixed(2)}%`;
  document.getElementById('sentiment-score').textContent = d.sentimentScore.toFixed(2);
  document.getElementById('news-count').textContent = d.newsCount.toLocaleString('en-US');
  document.getElementById('dashboard-recommendation').textContent = d.recommendation;
  document.getElementById('confidence').textContent = `${d.confidence}%`;
  document.getElementById('signal-text').textContent = d.recommendation;
  document.getElementById('signal-forecast').textContent = `${d.forecastChange >= 0 ? '+' : ''}${d.forecastChange.toFixed(2)}%`;
  document.getElementById('signal-sentiment').textContent = d.sentimentScore >= 0.15 ? 'Positive' : d.sentimentScore <= -0.15 ? 'Negative' : 'Neutral';
  document.getElementById('signal-economic').textContent = d.economicCondition;
}

function refreshDemo() {
  mockData.dashboard.currentPrice = +(mockData.dashboard.currentPrice + (Math.random() - .5) * 8).toFixed(2);
  mockData.dashboard.sentimentScore = +(mockData.dashboard.sentimentScore + (Math.random() - .5) * .06).toFixed(2);
  mockData.dashboard.newsCount += Math.floor(Math.random() * 8);
  updateDashboard();
  lastUpdate.textContent = new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';
  toast.textContent = 'Demo data diperbarui. Nanti tombol ini akan memanggil API backend.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

document.getElementById('refresh-btn').addEventListener('click', refreshDemo);

document.querySelectorAll('.period-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    toast.textContent = `Periode ${button.dataset.period} dipilih. Data asli nanti berasal dari backend.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  });
});

function filterNews() {
  const query = document.getElementById('news-search').value.toLowerCase();
  const category = document.getElementById('news-filter').value;
  renderNews(mockData.news.filter(item => item.title.toLowerCase().includes(query) && (category === 'all' || item.category === category)));
}

document.getElementById('news-search').addEventListener('input', filterNews);
document.getElementById('news-filter').addEventListener('change', filterNews);

updateDashboard();
renderRecentNews();
renderNews();
