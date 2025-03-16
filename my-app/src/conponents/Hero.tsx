import React, { useEffect, useState } from "react";
import { FaArrowUp, FaHeart, FaInfo, FaUser } from "react-icons/fa";
import { FaChartColumn, FaDownload, FaPeopleGroup } from "react-icons/fa6";

const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 giây
    const incrementTime = 20;
    const step = (end - start) / (duration / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <h4 className="text-lg font-bold">{count.toLocaleString()}+</h4>;
};

const Hero = () => {
  return (
    <div
        className="flex flex-wrap items-center justify-between bg-gradient-to-r from-purple-100 to-blue-100 py-20 px-44"
        style={{
          backgroundImage: "linear-gradient(to right, #E9D5FF, #BFDBFE), url('/backgroundHero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}
      >

      {/* Left Content (1) */}
      <div className="w-1/2 text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-900">
          A Ecosystem <br /> Combining Multi-Sectors
        </h2>
        <p className="mt-4 text-gray-600">
          MMOLogin Nexus is a multi-sector ecosystem that harmoniously combines 
          technology, entertainment, culture, beauty, and solutions....
        </p>
        <button className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700">
          Get Started Now
        </button>
      </div>

      <div className="w-1/2 flex justify-center">
        <div className="relative w-[350px] h-[300px] flex justify-center items-center">
          <div className="absolute top-44 left-8 bg-white rounded-lg shadow-lg p-4 w-40">
          <h4 className="text-sm font-semibold text-gray-800">Followers Stats</h4>
          <div 
            className="w-full h-16 rounded-md flex items-center justify-center" 
            style={{
              backgroundImage: "url('/followchart.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
          </div>
        </div>
          <div className="absolute top-0 right-50 bg-white rounded-lg shadow-lg p-4 w-32">
            <h4 className="text-xs font-semibold text-gray-600"><FaHeart/>Likes</h4>
            <p className="text-lg font-bold text-gray-800">             
              <Counter value={15900} />
            </p>

            <p className="text-xs text-green-500"><FaArrowUp/> 2.1% vs last 7 days</p>
          </div>

          <div className="absolute bottom-4 right-0 bg-white rounded-lg shadow-lg p-4 w-32">
            <h4 className="text-xs font-semibold text-gray-600">Reach</h4>
            <p className="text-lg font-bold text-gray-800">        
              <Counter value={256180} />
            </p>
            <p className="text-xs text-green-500"><FaArrowUp/> 2.1% vs last 7 days</p>
          </div>

          <div className="absolute top-20 left-64 bg-white border border-green-400 rounded-lg shadow-md p-4 w-40">
            <p className="text-xs text-gray-600"><Counter value={2938} /></p>
            <p className="text-xs text-green-500">Followers gained after this post</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10 ">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-wrap justify-around w-full md:w-3/4 z-10">
        <div className="flex gap-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center text-purple-700 text-xl"><FaPeopleGroup/></div>
            </div>
            <div className="flex flex-col items-center">
              <Counter value={15000} />
              <p className="text-sm text-gray-600">Active User</p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-700 text-xl"><FaDownload/></div>
            </div>
            <div className="flex flex-col items-center">
              <Counter value={30000} />
              <p className="text-sm text-gray-600">Total Download</p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-200 border-collapse flex items-center justify-center text-green-700 text-xl">
                <FaUser/>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Counter value={10000} />
              <p className="text-sm text-gray-600">Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
