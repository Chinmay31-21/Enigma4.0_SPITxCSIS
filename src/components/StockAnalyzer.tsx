import React, { useState } from 'react';

interface StockData {
  name: string;
  price: number;
  change: number;
}

const initialStocks: StockData[] = [
  { name: 'RELIANCE', price: 1415.00, change: 12.5 },
  { name: 'SBILIFE', price: 1821.80, change: -8.2 },
  { name: 'M&M', price: 3642.20, change: 25.1 },
  { name: 'HDFCBANK', price: 976.90, change: 4.7 },
];

const StockAnalyzer: React.FC = () => {
  const [stocks] = useState<StockData[]>(initialStocks);
  const [selected, setSelected] = useState<StockData>(initialStocks[0]);

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Stock Market Analysis</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        {stocks.map(stock => (
          <button
            key={stock.name}
            onClick={() => setSelected(stock)}
            className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
              selected.name === stock.name
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-blue-50'
            }`}
          >
            {stock.name}
          </button>
        ))}
      </div>
      <div className="p-4 bg-gray-50 rounded-xl text-center">
        <div className="text-lg font-bold">{selected.name}</div>
        <div className="text-2xl font-mono my-2">₹{selected.price.toFixed(2)}</div>
        <div className={selected.change >= 0 ? 'text-green-600' : 'text-red-600'}>
          {selected.change >= 0 ? '+' : ''}
          {selected.change.toFixed(2)}
        </div>
      </div>
      {/* Placeholder for chart or more analytics */}
      <div className="mt-6 text-gray-500 text-sm text-center">
        [Stock price chart and analytics coming soon!]
      </div>
    </section>
  );
};

export default StockAnalyzer;
