
const Map = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-yellow-100 py-20 px-44">
     <h2 className="text-5xl md:text-7xl font-bold text-center text-gray-800 leading-tight mb-6">
        We Aim For A <br />
        <span className="text-indigo-600">Multilingual System And Global Users</span>
      </h2>

      
      <div className="relative w-full max-w-8xl">
        <img src="/map.png" alt="Global Network Map" className="w-full h-auto" />
        <div className="absolute inset-0 flex flex-wrap justify-center items-center pointer-events-none">
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-blue-500 rounded-full transition-transform transform hover:scale-150"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
