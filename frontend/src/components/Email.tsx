
const EmailSubscription = () => {
  return (
    <div className="flex justify-center items-center py-20 px-10 bg-gradient-to-r from-[#d6ebff] to-[#f8dfff]">
      <div className="bg-[#8A76FC] rounded-2xl shadow-lg p-8 text-center py-20 px-44">
        <h2 className="text-white text-2xl md:text-3xl font-bold">
          Subscribe To Our Newsletter & Get The Coupon Code
        </h2>
        <p className="text-white text-sm opacity-80 mt-2">
          All your information is completely confidential
        </p>
        
        <div className="mt-6 flex bg-white rounded-full p-1">
          <input
            type="email"
            placeholder="Type your email"
            className="flex-1 px-4 py-2 outline-none text-gray-600 rounded-l-full"
          />
          <button className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
