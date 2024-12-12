import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { userId } = useAppContext(); // Lấy userId từ context
  const [cart, setCart] = useState<{
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }[]>([]);

  // Fetch sản phẩm từ API
  const { data: product, isLoading, isError } = useQuery(
    ["fetchProduct", productId],
    () => apiClient.getProductById(productId as string),
    {
      onError: (error) => {
        console.error("Error fetching product:", error);
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
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  if (isLoading) return <span>Đang tải thông tin sản phẩm...</span>;

  if (isError || !product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Không tìm thấy sản phẩm</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{product.product_name}</h1>
      <div className="flex">
        <div className="w-1/2 h-auto">
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
        <div className="w-1/2 pl-8">
          <p className="text-gray-600">Giá: {product.price} VND</p>
          <p className="text-gray-600">Tồn kho: {product.stock}</p>
          <p className="text-gray-600">Mô tả: {product.description}</p>
          
          {/* Nút Thêm vào giỏ hàng */}
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
