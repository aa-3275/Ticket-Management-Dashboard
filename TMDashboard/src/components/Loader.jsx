const Loader = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 h-24 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default Loader;
