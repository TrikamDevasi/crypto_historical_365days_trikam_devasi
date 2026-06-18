const Loader = ({ size = 'md', text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 py-12">
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-[var(--color-indigo)] animate-pulse-ring" />
        <span className="font-display font-bold text-2xl text-[var(--color-text)] tracking-wider">CRYPTEX</span>
      </div>
      {text && <p className="text-xs text-[var(--color-text-muted)] tracking-wide">{text}</p>}
    </div>
  );
};

export default Loader;
