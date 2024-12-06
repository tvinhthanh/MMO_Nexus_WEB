import React, { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

const XemSanPham: React.FC = () => {
    const {userId} = useAppContext();
  const [cart, setCart] = useState<string[]>([]); // Lưu trữ danh sách sản phẩm trong giỏ hàng

  // Fetch all products
  const { data: productData, isLoading, isError } = useQuery(
    "fetchAllProducts",
    apiClient.getAllProducts,
    {
      onError: (error) => {
        console.error("Error fetching products:", error);
      },
    }
  );

  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (productId: string) => {
    if (cart.includes(productId)) {
      alert("Sản phẩm đã có trong giỏ hàng.");
      return;
    }
  
    try {
  
      // Gọi API với 2 tham số user_id và product_id
      const response = await apiClient.addToCart(userId as string, productId);
  
      // Kiểm tra phản hồi từ API
      if (response.success) {
        setCart((prevCart) => [...prevCart, productId]); // Thêm sản phẩm vào giỏ hàng
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      } else {
        alert("Thêm sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };
  

  if (isLoading) return <span>Đang tải sản phẩm...</span>;

  if (isError || !productData || productData.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Không có sản phẩm nào trong hệ thống</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Danh sách tất cả sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData.map((product: any) => (
          <div
            key={product.product_id}
            className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
          >
            {/* Hình ảnh sản phẩm */}
            <div className="w-full h-40 overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Chưa có hình ảnh</span>
              )}
            </div>

            {/* Thông tin sản phẩm */}
            <h3 className="text-lg font-bold">{product.product_name}</h3>
            <p className="text-gray-600">Giá: {product.price} VND</p>
            <p className="text-gray-600">Tồn kho: {product.stock}</p>
            <p className="text-gray-600">Mô tả: {product.description}</p>

            {/* Nút Add to Cart */}
            <button
              onClick={() => handleAddToCart(product.product_id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Hiển thị giỏ hàng */}
      {cart.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h2>
          <ul className="list-disc pl-5">
            {cart.map((productId) => (
              <li key={productId} className="text-gray-700">
                Sản phẩm ID: {productId}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default XemSanPham;
