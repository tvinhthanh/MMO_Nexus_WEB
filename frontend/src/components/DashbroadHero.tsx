
const DashboardHero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-100 to-blue-100 py-20 px-44 md:px-20 relative">
      <div className="md:w-1/2 w-full text-center md:text-left py-20 px-44">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
          One Identity, <br /> Connecting All Experiences
        </h2>
        <p className="mt-4 text-gray-600">
          MMOLogin Nexus mang đến trải nghiệm hợp nhất, cho phép bạn sử dụng một tài khoản duy nhất để truy cập và tận hưởng toàn bộ dịch vụ.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img src="/backgroundchart.png" alt="Dashboard UI" className="max-w-full h-auto rounded-lg shadow-lg" />
      </div>
      </div>
  );
};

export default DashboardHero;