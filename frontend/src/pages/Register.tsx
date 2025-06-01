const Register = () => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-3">Tạo tài khoản</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-xs font-semibold flex-1">
          Họ
          <input
            className="border rounded w-full py-1 px-2 text-sm"
            placeholder="Nhập họ"
          />
        </label>
        <label className="text-gray-700 text-xs font-semibold flex-1">
          Tên
          <input
            className="border rounded w-full py-1 px-2 text-sm"
            placeholder="Nhập tên"
          />
        </label>
      </div>

      <label className="text-gray-700 text-xs font-semibold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 text-sm"
          placeholder="abc@example.com"
        />
      </label>

      <label className="text-gray-700 text-xs font-semibold">
        Số điện thoại
        <input
          type="tel"
          className="border rounded w-full py-1 px-2 text-sm"
          placeholder="0123456789"
        />
      </label>

      <label className="text-gray-700 text-xs font-semibold">
        Mật khẩu
        <input
          type="password"
          className="border rounded w-full py-1 px-2 text-sm"
          placeholder="********"
        />
      </label>

      <label className="text-gray-700 text-xs font-semibold">
        Nhập lại mật khẩu
        <input
          type="password"
          className="border rounded w-full py-1 px-2 text-sm"
          placeholder="********"
        />
      </label>

      <label className="text-gray-700 text-xs font-semibold">
        Địa chỉ
        <input
          type="text"
          className="border rounded w-full py-1 px-2 text-sm"
          placeholder="123 Nguyễn Văn A, Quận 1"
        />
      </label>
      <button
        type="button"
        className="bg-[#8976FD] text-white p-2 font-semibold hover:bg-[#8976FD] text-lg rounded mt-4"
      >
        Tạo Tài Khoản
      </button>
    </div>
  );
};

export default Register;
