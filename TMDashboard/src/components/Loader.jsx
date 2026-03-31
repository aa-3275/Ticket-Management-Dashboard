const Loader = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              h-24 rounded-2xl animate-pulse
              bg-gray-200 dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
            "
          />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="
              h-64 rounded-2xl animate-pulse
              bg-gray-200 dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
            "
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
