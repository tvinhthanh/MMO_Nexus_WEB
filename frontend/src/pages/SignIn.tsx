import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <form className="flex flex-col gap-3 p-4 max-w-sm mx-auto ">
      <h2 className="text-xl font-bold text-center mb-4">Đăng nhập</h2>

      <label className="text-gray-700 text-xs font-semibold">
        Email
        <input
          type="email"
          placeholder="example@email.com"
          className="border rounded w-full py-1 px-2 mt-1 text-sm"
        />
      </label>

      <label className="text-gray-700 text-xs font-semibold mt-3">
        Mật khẩu
        <input
          type="password"
          placeholder="********"
          className="border rounded w-full py-1 px-2 mt-1 text-sm"
        />
      </label>

      <span className="flex items-center justify-between mt-4 text-xs">
        <span className="text-sm">
          Chưa có tài khoản?{" "}
          <Link className="underline text-black-600" to="/register">
            Đăng ký tại đây
          </Link>
        </span>

        <button
          type="button"
          className="bg-[#8976FD] text-white px-4 py-2 font-semibold hover:bg-[#8976FD] text-sm rounded"
        >
          Đăng nhập
        </button>
      </span>
    </form>
  );
};

export default SignIn;
