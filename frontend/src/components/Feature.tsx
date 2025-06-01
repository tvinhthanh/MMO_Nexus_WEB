
const FeatureSection = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-blue-100 text-center py-20 px-44">
      <h2 className="text-3xl font-bold text-gray-900">The Power Of Combination</h2>
      <p className="mt-2 text-gray-600">MMOLogin Nexus là ngôi nhà chung của những dự án tiềm năng, cùng nhau tạo nên một hệ sinh thái vững mạnh.</p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 py-20 px-44">
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <img src="/feature1-unscreen.gif" alt="Digital Credibility" className="w-42 h-24 bg-transparent object-contain" />
            <h3 className="text-base font-semibold text-gray-800">Digital Credibility</h3>
            <p className="text-gray-600">An tâm giao dịch trực tuyến với hệ thống xác thực danh tính đa chiều và bảo hiểm giao dịch.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <img src="/feature2-unscreen.gif" alt="KiNi World" className="w-42 h-24 bg-transparent object-contain" />
            <h3 className="text-base font-semibold text-gray-800">KiNi World</h3>
            <p className="text-gray-600">Giải trí mỗi ngày với cơ chế 'Fun To Earn' độc đáo, nhận thưởng và giao dịch tài sản số dễ dàng.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <img src="/feature3-unscreen.gif" alt="Playou Together" className="w-42 h-24 bg-transparent object-contain" />
            <h3 className="text-base font-semibold text-gray-800">Playou Together</h3>
            <p className="text-gray-600">Kết nối bạn bè, tham gia bang hội, khám phá thế giới ảo và trải nghiệm các trò chơi dân gian.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <img src="/feature4-unscreen.gif" alt="Univer Beauty" className="w-42 h-24 bg-transparent object-contain" />
            <h3 className="text-base font-semibold text-gray-800">Univer Beauty</h3>
            <p className="text-gray-600">Tôn vinh vẻ đẹp toàn diện, kết hợp chăm sóc sức khỏe bên trong và vẻ ngoài cuốn hút.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <img src="/feature5-unscreen.gif" alt="Wibu Mirage" className="w-42 h-24 bg-transparent object-contain" />
            <h3 className="text-base font-semibold text-gray-800">Wibu Mirage</h3>
            <p className="text-gray-600">Đắm mình trong không gian giải trí đa phương tiện với cảm hứng từ văn hóa Wibu.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <img src="/feature6-unscreen.gif" alt="MMOLogin Solutions" className="w-42 h-24 bg-transparent object-contain" />
            <h3 className="text-base font-semibold text-gray-800">MMOLogin Solutions</h3>
            <p className="text-gray-600">Khai thác cơ hội kiếm tiền trực tuyến trên đa nền tảng với các dịch vụ.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
