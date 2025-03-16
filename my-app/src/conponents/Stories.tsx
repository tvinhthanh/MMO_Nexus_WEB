import React from 'react'

const Stories = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between py-20 px-44 bg-gradient-to-r from-purple-100 to-blue-100">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900">
              See Our Success <br /> Stories
            </h2>
            <p className="mt-4 text-gray-600">
              MMOLogin Nexus không chỉ là giải trí, đó còn là cơ hội để gia tăng thu nhập. 
              Đây là một hệ sinh thái tuyệt vời...
            </p>
            <p className="mt-2 font-bold text-gray-800">TrangKhan102</p>
          </div>
    
          <div className="relative w-[300px] h-[300px] flex justify-center items-center">
            <div className="w-48 h-48 rounded-full border-2 border-white shadow-lg flex justify-center items-center bg-white">
              <img
                src="/main-avatar.png"
                alt="Main User"
                className="w-48 h-48 rounded-full"
              />
            </div>
    
            <img
              src="/user1.png"
              alt="User 1"
              className="absolute top-2 left-0 w-16 h-16 rounded-full border-4 border-white shadow-md bg-green-200"
            />
            <img
              src="/user2.png"
              alt="User 2"
              className="absolute bottom-2 right-0 w-14 h-14 rounded-full border-4 border-white shadow-md bg-red-200"
            />
            <img
              src="/user3.png"
              alt="User 3"
              className="absolute top-6 right-0 w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200"
            />
          </div>
        </div>
  )
}

export default Stories