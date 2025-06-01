import { useState } from "react";

const storyData = [
  {
    title: "See Our Success",
    text: "MMOLogin Nexus không chỉ là giải trí, đó còn là cơ hội để gia tăng thu nhập. Đây là một hệ sinh thái tuyệt vời...",
    author: "TrangKhan102",
    mainAvatar: "/main-avatar.png",
  },
  {
    title: "Empowered By MMOLogin",
    text: "Từ một người mới, tôi đã học hỏi và tạo ra nguồn thu nhập ổn định mỗi tháng nhờ hệ sinh thái MMOLogin.",
    author: "HoangDev88",
    mainAvatar: "/main-avatar.png",
  },
  {
    title: "Journey to Financial Freedom",
    text: "Gia nhập MMOLogin là quyết định thay đổi cuộc đời tôi. Tôi vừa học, vừa chơi, vừa kiếm được thu nhập bền vững.",
    author: "LinhNguyen23",
    mainAvatar: "/main-avatar.png",
  },
];

const Stories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStory = storyData[activeIndex];

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between py-24 px-6 md:px-64 bg-gradient-to-r from-purple-100 to-blue-100 overflow-hidden">
      {/* Left content */}
      <div className="md:w-1/2 text-center md:text-left z-10">
        <h2 className="text-4xl font-bold text-gray-900 leading-snug">
          {currentStory.title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h2>
        <p className="mt-4 text-gray-600">{currentStory.text}</p>
        <p className="mt-2 font-bold text-gray-800">{currentStory.author}</p>
      </div>

      {/* Right avatar */}
      <div className="relative w-[600px] h-[500px] flex justify-center items-center z-10">
        <div className="w-[395px] h-[394px] rounded-full border-2 border-white shadow-lg flex justify-center items-center bg-white">
          <img
            src={currentStory.mainAvatar}
            alt="Main User"
            className="w-[395px] h-[394px] rounded-full object-cover"
          />
        </div>

        {/* Static decorative avatars */}
        <img
          src="/user1.png"
          alt="User 1"
          className="absolute top-2 left-0 w-16 h-16 rounded-full border-4 border-white shadow-md bg-green-200"
        />
        <img
          src="/user1.png"
          alt="User 2"
          className="absolute bottom-2 right-0 w-14 h-14 rounded-full border-4 border-white shadow-md bg-red-200"
        />
        <img
          src="/user1.png"
          alt="User 3"
          className="absolute top-6 right-0 w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200"
        />
      </div>

      {/* Bullets bottom center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {storyData.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full border border-purple-400 transition-all duration-300 transform ${
              activeIndex === index
                ? "bg-purple-500 scale-125"
                : "bg-transparent hover:bg-purple-200"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;
