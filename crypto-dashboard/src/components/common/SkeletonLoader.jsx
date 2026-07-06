const SkeletonLoader = ({ rows = 5, columns = 4, type = 'table' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="skeleton h-[40px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      {/* Header skeleton */}
      <div className="flex gap-4 px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="skeleton h-[14px] flex-1" />
        ))}
      </div>
      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-white/[0.02]">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="skeleton h-[14px] flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
