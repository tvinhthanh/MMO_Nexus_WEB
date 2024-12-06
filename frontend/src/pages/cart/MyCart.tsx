import React, { useState } from "react";

const MyCart = () => {
  const [cart, setCart] = useState([]); // Khởi tạo giỏ hàng rỗng

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (id_product : any) => {
    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    if (!cart.includes(id_product)) {
      setCart((prevCart) => [...prevCart, id_product]);
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    } else {
      alert("Sản phẩm này đã có trong giỏ hàng!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>
      {/* Giả lập danh sách sản phẩm */}
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((id_product) => (
          <div
            key={id_product}
            className="border border-gray-300 rounded-lg p-4 text-center"
          >
            <p>Sản phẩm {id_product}</p>
            <button
              onClick={() => handleAddToCart(id_product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 mt-4"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>

      {/* Hiển thị giỏ hàng */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Giỏ hàng</h2>
        {cart.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <ul className="list-disc list-inside">
            {cart.map((id_product, index) => (
              <li key={index}>Sản phẩm ID: {id_product}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyCart;
