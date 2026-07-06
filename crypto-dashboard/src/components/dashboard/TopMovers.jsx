import { formatCurrency, formatPercent } from '../../utils/formatters';

const TopMovers = ({ coins, onRowClick }) => {
  return (
    <div className="glass-panel p-6 flex flex-col h-[360px]">
      <div className="mb-4">
        <h3 className="text-[12px] font-semibold text-[#888888] uppercase tracking-widest font-sans">Top Movers</h3>
        <p className="text-xs text-[#666666] font-sans mt-0.5">Highest 24h volume assets</p>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {coins?.slice(0, 5).map((coin) => (
          <div 
            key={coin._id} 
            className="flex items-center justify-between p-3 rounded-lg border border-[#333333] hover:bg-[#111111] transition-colors cursor-pointer" 
            onClick={() => onRowClick(coin)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center font-bold text-xs font-mono text-white">
                {coin.symbol?.toUpperCase().substring(0, 3)}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{coin.name}</div>
                <div className="text-xs text-[#888888] uppercase">{coin.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-white">{formatCurrency(coin.price, 2)}</div>
              <div className={`text-xs font-mono font-medium ${coin.return_24h >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {coin.return_24h >= 0 ? '+' : ''}{formatPercent(coin.return_24h)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
