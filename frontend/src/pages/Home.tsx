import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate để điều hướng
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const Home: React.FC = () => {
  const { userId, searchData } = useAppContext(); // Lấy userId từ context
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [cart, setCart] = useState<{
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }[]>([]);
  const [favorites, setFavorites] = useState<{
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }[]>([]);

  // Fetch danh sách tất cả sản phẩm
  const { data: productData, isLoading, isError } = useQuery(
    "fetchAllProducts",
    apiClient.getAllProducts, // Hàm API để lấy danh sách sản phẩm
    {
      onError: (error) => {
        console.error("Error fetching products:", error);
      },
    }
  );

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (product: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }) => {
    const productInCart = cart.find((item) => item.product_id === product.product_id);

    if (productInCart) {
      alert("Sản phẩm đã có trong giỏ hàng.");
      return;
    }

    try {
      const response = await apiClient.addToCart(
        userId as string,
        product.product_id,
        product.product_name,
        product.quantity,
        product.product_price,
        product.image,
        product.store_id
      );
      if (response.success) {
        setCart((prevCart) => [...prevCart, product]);
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      } else {
        alert("Thêm sản phẩm vào giỏ hàng thất bại.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  // Hàm xử lý thêm/xóa sản phẩm khỏi danh sách yêu thích
  const toggleFavorite = (product: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.product_id === product.product_id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.product_id !== product.product_id); // Xóa khỏi yêu thích
      } else {
        return [...prevFavorites, product]; // Thêm vào yêu thích
      }
    });
  };

  // Hàm xử lý khi người dùng nhấn "Xem chi tiết"
  const handleViewDetail = (productId: string) => {
    navigate(`/product/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
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
      {
        (searchData.length > 0)?
          <h1 className="text-3xl font-bold mb-6">Danh sách tìm kiếm</h1>:<span>&nbsp;</span>
        
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {searchData.map((product: any) => (
          <div key={product.product_id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            <div className="w-full h-40 overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
              {product.image ? (
                <img src={product.image} alt={product.product_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">Chưa có hình ảnh</span>
              )}
            </div>

            <h3 className="text-lg font-bold">{product.product_name}</h3>
            <p className="text-gray-600">Giá: {product.price} VND</p>
            <p className="text-gray-600">Tồn kho: {product.stock}</p>
            <p className="text-gray-600">Mô tả: {product.description}</p>

            <button
              onClick={() =>
                handleAddToCart({
                  product_id: product.product_id,
                  product_name: product.product_name,
                  product_price: product.price,
                  quantity: 1,
                  image: product.image,
                  store_id: product.store_id,
                })
              }
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded"
              disabled={product.stock === 0}

            >
              Thêm vào giỏ hàng
            </button>

            <button
              onClick={() =>
                toggleFavorite({
                  product_id: product.product_id,
                  product_name: product.product_name,
                  product_price: product.price,
                  quantity: 1,
                  image: product.image,
                  store_id: product.store_id,
                })
              }
              className="mt-4 py-2 px-4 bg-transparent text-red-500 rounded"
            >
              <span className="text-2xl">
                {favorites.some((fav) => fav.product_id === product.product_id) ? "❤️" : "🤍"}
              </span>
            </button>

            <button
              onClick={() => handleViewDetail(product.product_id)} // Mở chi tiết sản phẩm
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
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
            <h3 className="text-lg font-bold">Tên: {product.product_name}</h3>
            <p className="text-gray-600">Giá: {product.price} VND</p>
            <p className="text-gray-600">Tồn kho: {product.stock}</p>
            <p className="text-gray-600">Mô tả: {product.description}</p>

            {/* Nút Add to Cart */}
            <button
              onClick={() =>
                handleAddToCart({
                  product_id: product.product_id,
                  product_name: product.product_name,
                  product_price: product.price,
                  quantity: 1, // Số lượng mặc định là 1
                  image: product.image,
                  store_id: product.store_id,
                })
              }
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded"
            >
              Thêm vào giỏ hàng
            </button>

            {/* Nút Add to Favorites */}
            <button
              onClick={() => toggleFavorite({
                product_id: product.product_id,
                product_name: product.product_name,
                product_price: product.price,
                quantity: 1, // Số lượng mặc định là 1
                image: product.image,
                store_id: product.store_id,
              })}
              className="mt-4 py-2 px-4 bg-transparent text-red-500 rounded"
            >
              {/* Hiển thị trái tim đầy nếu sản phẩm trong danh sách yêu thích */}
              <span className="text-2xl">
                {favorites.some((fav) => fav.product_id === product.product_id) ? '❤️' : '🤍'}
              </span>
            </button>

            {/* Nút Xem chi tiết */}
            <button
              onClick={() => handleViewDetail(product.product_id)}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {/* Hiển thị danh sách yêu thích */}
      {favorites.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Danh sách yêu thích</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div
                key={product.product_id}
                className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
              >
                {/* Hình ảnh sản phẩm yêu thích */}
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

                {/* Thông tin sản phẩm yêu thích */}
                <h3 className="text-lg font-bold">{product.product_name}</h3>
                <p className="text-gray-600">Giá: {product.product_price} VND</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
