const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Upper Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel p-6 h-36 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-3 w-1/2">
                <div className="h-3 bg-[#333333] rounded w-full"></div>
                <div className="h-8 bg-[#333333] rounded w-3/4"></div>
                <div className="h-3 bg-[#333333] rounded w-1/2 mt-2"></div>
              </div>
              <div className="h-10 w-10 bg-[#333333] rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Movers Skeleton */}
        <div className="lg:col-span-4 glass-panel p-6 h-[360px]">
          <div className="space-y-2 mb-6">
            <div className="h-3 bg-[#333333] rounded w-1/3"></div>
            <div className="h-2 bg-[#333333] rounded w-1/2"></div>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3 w-1/2">
                  <div className="h-8 w-8 rounded-full bg-[#333333]"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-3 bg-[#333333] rounded w-3/4"></div>
                    <div className="h-2 bg-[#333333] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 w-1/4">
                  <div className="h-3 bg-[#333333] rounded w-full"></div>
                  <div className="h-2 bg-[#333333] rounded w-3/4 ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="lg:col-span-8 glass-panel p-6 h-[360px] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2 w-1/4">
              <div className="h-3 bg-[#333333] rounded w-full"></div>
              <div className="h-2 bg-[#333333] rounded w-2/3"></div>
            </div>
            <div className="h-8 bg-[#333333] rounded w-24"></div>
          </div>
          <div className="flex-1 bg-[#111111] rounded border border-[#333333]"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
