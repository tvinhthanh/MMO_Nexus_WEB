import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    image: "/post1.png",
    category: "Random",
    date: "08 Feb 2025",
    title: "Name Off The Post Dài Khoảng 2 Dòng...",
  },
  {
    id: 2,
    image: "/post2.png",
    category: "Random",
    date: "08 Feb 2025",
    title: "Name Off The Post Dài Khoảng 2 Dòng...",
  },
  {
    id: 3,
    image: "/post3.png",
    category: "Random",
    date: "08 Feb 2025",
    title: "Name Off The Post Dài Khoảng 2 Dòng...",
  },
];

const Post = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-800">Read Our Blog</h2>
        <p className="text-sm text-gray-500 mt-2">
          Nơi chúng tôi thường xuyên cập nhật những chia sẻ hữu ích
        </p>
      </div>

<div className="mt-6 py-10 px-8 md:px-24">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">Most Popular Posts</h3>
            <div className="mt-8 flex justify-center items-center space-x-4">
                <button className="bg-purple-50  p-2 rounded-md shadow-md hover:bg-gray-200">
                <FaArrowLeft className="text-gray-600 borderRadius: 15" />
            </button>
            <span className="text-gray-800 font-semibold text-lg left-3">2</span>
                <button className="bg-purple-50 p-2 rounded-md shadow-md hover:bg-gray-200">
                <FaArrowRight className="text-gray-600 borderRadius: 15" />
            </button>
        </div>
      </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg p-4">
              <img src={post.image} alt={post.title} className="rounded-lg w-full" />
              <div className="mt-4 text-gray-600 text-sm flex justify-between">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mt-2">{post.title}</h4>
              <button className="mt-3 text-purple-600 font-semibold">Read more</button>
            </div>
          ))}
        </div>
      </div>      
    </div>
  );
};

export default Post;
