import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/exchanges');
        setExchanges(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading exchanges...</div>;
  }

  return (
    <div className="px-5 md:px-16 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Top Crypto Exchanges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exchanges.map((exchange) => (
          <div key={exchange.id} className="border p-4 rounded-lg hover:shadow-lg transition dark:text-white">
            <div className="flex items-center gap-4 mb-4">
              <img src={exchange.image} alt={exchange.name} className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold">{exchange.name}</h2>
                <p className="text-sm text-gray-500">Trust Score: {exchange.trust_score}</p>
              </div>
            </div>
            <p><strong>Year Established:</strong> {exchange.year_established || 'N/A'}</p>
            <p><strong>Country:</strong> {exchange.country || 'N/A'}</p>
            <p><strong>24h Volume (BTC):</strong> {exchange.trade_volume_24h_btc.toLocaleString()}</p>
            <a href={exchange.url} target="_blank" rel="noreferrer" className="text-blue-500 mt-2 inline-block">
              Visit Website →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
