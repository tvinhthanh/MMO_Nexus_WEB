
const Section = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-blue-100 text-center py-20 px-44">
      <div className="container mx-auto py-20 px-44 bg-gradient-to-b from-purple-100 to-blue-100">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="w-full lg:w-1/2">
            <img src="/image1.png" loading="lazy" alt="Diverse Graphics, The Future Of Experience" className="w-full h-auto" />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Diverse Graphics, The Future Of Experience</h2>
            <p className="text-gray-600">MMOLogin Nexus mang đến trải nghiệm hợp nhất, cho phép bạn sử dụng một tài khoản duy nhất để truy cập và tận hưởng toàn bộ dịch vụ. Chúng tôi sử dụng công nghệ blockchain và các giải pháp bảo mật hiện đại để bảo vệ tài khoản của bạn một cách an toàn nhất.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 mb-16">
          <div className="w-full lg:w-1/2">
            <img src="/image2.png" loading="lazy" alt="Fun To Earn Entertainment & Earn Income" className="w-full h-auto" />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">"Fun To Earn" Entertainment & Earn Income</h2>
            <p className="text-gray-600">MMOLogin Nexus không chỉ là giải trí, đó còn là cơ hội để bạn gia tăng thu nhập. Với cơ chế 'Fun To Earn', bạn có thể kiếm tiền thông qua các hoạt động giải trí, nhiệm vụ và sự kiện.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
