import React, { useEffect, useState } from "react";
import { FaArrowUp, FaHeart, FaUser } from "react-icons/fa";
import { FaDownload, FaPeopleGroup } from "react-icons/fa6";

const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
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

  return <span>{count.toLocaleString()}</span>;
};

const Hero = () => {
  return (
    <section
      className="w-full py-20 px-4 bg-gradient-to-r from-purple-100 to-blue-100 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, #E9D5FF, #BFDBFE), url('/backgroundHero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Giới hạn nội dung bên trong */}
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Left content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            An Ecosystem <br /> Combining Multi-Sectors
          </h1>
          <p className="text-gray-600 max-w-md mx-auto md:mx-0">
            MMOLogin Nexus is a multi-sector ecosystem that harmoniously combines
            technology, entertainment, culture, beauty, and solutions.
          </p>
          <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
            Get Started Now
          </button>
        </div>

        {/* Right content – các box số liệu */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <div className="relative w-full max-w-lg min-h-[500px]">

            {/* Likes */}
            <StatCard
              icon={<FaHeart />}
              title="Likes"
              value={15900}
              position="top-0 left-20"
              change="+2.1% vs last 7 days"
              color="red"
            />

            {/* Followers Gained */}
            <StatCard
              icon={<FaUser className="text-xs" />}
              title="Followers gained"
              value={2938}
              position="top-20 left-96"
              small
              subtitle="after this post"
              color="green"
              border
            />

            {/* Chart */}
            <div className="absolute top-48 left-0 bg-white rounded-xl shadow-xl p-6 w-72 min-h-[140px] flex flex-col gap-2">
              <h4 className="text-md font-semibold text-gray-700">Followers Stats</h4>
              <img
                src="/followchart.png"
                alt="Followers Chart"
                className="w-full h-36 object-contain"
              />
            </div>

            {/* Reach */}
            <StatCard
              icon={<FaDownload />}
              title="Reach"
              value={256180}
              position="bottom-10 left-96"
              change="+2.1% vs last 7 days"
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* Bottom block thống kê tổng */}
      <div className="mt-20 flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-wrap justify-around w-full md:w-3/4 gap-6">
          <SummaryItem icon={<FaPeopleGroup />} value={15000} label="Active User" color="purple" />
          <SummaryItem icon={<FaDownload />} value={30000} label="Total Download" color="yellow" />
          <SummaryItem icon={<FaUser />} value={10000} label="Customers" color="green" />
        </div>
      </div>
    </section>
  );
};

// Reusable components
const StatCard = ({
  icon,
  title,
  value,
  position,
  change,
  subtitle,
  color,
  small = false,
  border = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  position: string;
  change?: string;
  subtitle?: string;
  color: string;
  small?: boolean;
  border?: boolean;
}) => {
  const baseClass = `absolute ${position} bg-white ${
    border ? `border border-${color}-400` : ``
  } rounded-xl shadow-md p-4 ${
    small ? "w-52 min-h-[90px]" : "w-60 min-h-[140px]"
  } flex flex-col gap-1`;

  return (
    <div className={baseClass}>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 bg-${color}-100 text-${color}-600 flex items-center justify-center rounded-full`}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-gray-600">{title}</span>
      </div>
      <div className={`text-${small ? "lg" : "2xl"} font-bold text-gray-900`}>
        <Counter value={value} />+
      </div>
      {change && (
        <div className="text-sm text-green-500 flex items-center gap-1">
          <FaArrowUp className="text-xs" /> {change}
        </div>
      )}
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
};

const SummaryItem = ({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}) => (
  <div className="flex gap-x-4 items-center">
    <div className={`w-28 h-28 bg-${color}-200 rounded-lg flex items-center justify-center text-${color}-700 text-xl`}>
      {icon}
    </div>
    <div className="flex flex-col items-start">
      <span className="text-4xl font-extrabold text-gray-900">
        <Counter value={value} />
      </span>
      <p className="text-xl text-gray-600">{label}</p>
    </div>
  </div>
);

export default Hero;
