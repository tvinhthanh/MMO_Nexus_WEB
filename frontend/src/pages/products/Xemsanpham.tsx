import React, { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để chuyển trang

const XemSanPham: React.FC = () => {
  const { userId } = useAppContext();
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

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const { data: productData, isLoading, isError } = useQuery(
    "fetchAllProducts",
    apiClient.getAllProducts,
    {
      onError: (error) => {
        console.error("Error fetching products:", error);
      },
    }
  );

  const handleAddToCart = async (product: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }) => {
    if (cart.some((item) => item.product_id === product.product_id)) {
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
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const toggleFavorite = (product: {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.product_id === product.product_id);
      return isFavorite
        ? prevFavorites.filter((fav) => fav.product_id !== product.product_id)
        : [...prevFavorites, product];
    });
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
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
              onClick={() => handleViewDetails(product.product_id)} // Mở chi tiết sản phẩm
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Danh sách yêu thích</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div key={product.product_id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
                <div className="w-full h-40 overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
                  {product.image ? (
                    <img src={product.image} alt={product.product_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">Chưa có hình ảnh</span>
                  )}
                </div>

                <h3 className="text-lg font-bold">{product.product_name}</h3>
                <p className="text-gray-600">Giá: {product.product_price} VND</p>
                <button
                  onClick={() =>
                    handleAddToCart({
                      product_id: product.product_id,
                      product_name: product.product_name,
                      product_price: product.product_price,
                      quantity: 1,
                      image: product.image,
                      store_id: product.store_id,
                    })
                  }
                  className="mt-4 py-2 px-4 bg-green-500 text-white rounded"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default XemSanPham;
