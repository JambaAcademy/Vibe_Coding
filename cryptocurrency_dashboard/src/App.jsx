
import React, { useEffect, useState, useRef } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function App() {
  const COINS = React.useMemo(() => [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', color: 'yellow-400' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', color: 'blue-400' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', color: 'yellow-300' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', color: 'emerald-400' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', color: 'indigo-400' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', color: 'cyan-400' },
  ], []);

  const [prices, setPrices] = useState(Object.fromEntries(COINS.map(c => [c.id, { price: null, change: null, alert: false }])));
  const [prevPrices, setPrevPrices] = useState({});
  const [history, setHistory] = useState(Object.fromEntries(COINS.map(c => [c.id, []])));
  const historyRef = useRef(Object.fromEntries(COINS.map(c => [c.id, []])));
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const fetchPrices = async () => {
      const ids = COINS.map(c => c.id).join(',');
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url);
      const data = await res.json();
      setPrices((old) => {
        const updated = {};
        const newHistory = { ...historyRef.current };
        for (const coin of COINS.map(c => c.id)) {
          const price = data[coin]?.usd ?? null;
          const change = data[coin]?.usd_24h_change ?? null;
          const prev = prevPrices[coin]?.price ?? price;
          const moved = price && prev ? Math.abs(((price - prev) / prev) * 100) : 0;
          updated[coin] = {
            price,
            change,
            alert: moved > 5,
          };
          // Update history
          newHistory[coin] = [...(newHistory[coin] || []), price].slice(-20);
        }
        historyRef.current = newHistory;
        setHistory(newHistory);
        setPrevPrices(Object.fromEntries(COINS.map(c => [c.id, { price: data[c.id]?.usd ?? null }])));
        return updated;
      });
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // update every 10s
    return () => clearInterval(interval);
  }, [prevPrices, COINS]);

  return (
    <>
      <div className={`min-h-screen flex flex-col items-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-yellow-100 via-white to-blue-100 text-gray-900'}`}>
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg tracking-tight w-full">Crypto Dashboard</h1>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border ${theme === 'dark' ? 'bg-gray-800 text-yellow-300 border-blue-900' : 'bg-white text-blue-900 border-blue-300'} transition-colors duration-300`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {COINS.map(coin => (
              <div key={coin.id} className="w-full sm:w-[350px] md:w-[320px] lg:w-[300px] bg-gradient-to-tr from-gray-800 via-gray-900 to-blue-800 rounded-2xl p-6 shadow-xl border border-blue-900 flex flex-col transition-transform hover:scale-105 mb-6">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full bg-${coin.color} animate-pulse`}></span>
                  {coin.name} ({coin.symbol})
                </h2>
                <div className="text-3xl font-extrabold mb-1">${prices[coin.id].price?.toLocaleString() ?? '--'}</div>
                <div className={`text-sm mb-2 ${prices[coin.id].change > 0 ? 'text-green-400' : 'text-red-400'}`}>Change: {prices[coin.id].change?.toFixed(2) ?? '--'}%</div>
                <div className="h-32 md:h-40 mt-2 bg-gray-700 rounded-lg flex items-center justify-center">
                  {history[coin.id].length > 1 ? (
                    <Line
                      data={{
                        labels: history[coin.id].map((_, i) => i + 1),
                        datasets: [
                          {
                            data: history[coin.id],
                            borderColor: coin.id === 'bitcoin' ? '#f7931a' : coin.id === 'ethereum' ? '#627eea' : coin.id === 'dogecoin' ? '#c2a633' : coin.id === 'solana' ? '#00ffba' : coin.id === 'cardano' ? '#0033ad' : coin.id === 'ripple' ? '#00bcd4' : '#888',
                            backgroundColor: 'rgba(96,165,250,0.2)',
                            fill: true,
                            tension: 0.3,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { ticks: { color: theme === 'dark' ? '#fff' : '#222' } } },
                      }}
                    />
                  ) : (
                    <span>Chart</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 w-full max-w-2xl mx-auto">
            {COINS.map(coin => prices[coin.id].alert && (
              <div key={coin.id} className={`bg-gradient-to-r from-${coin.color} via-white to-blue-300 text-gray-900 p-3 rounded-xl shadow-lg mb-2 animate-pulse text-center font-bold`}>Price Alert: {coin.symbol} moved more than 5%!</div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default App
