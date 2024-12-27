import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [rating, setRating] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const { userId } = useAppContext(); // Lấy userId từ context
  const queryClient = useQueryClient();
  const [cart, setCart] = useState<{
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    store_id: string;
  }[]>([]);

  // Fetch reviews data
    const { data: reviewData } = useQuery(
      ["getReviews", productId],
      () => apiClient.getReviews(productId as string),
      { enabled: !!userId }
    );

  // Create add review mutation
    const { mutate: createReview } = useMutation(apiClient.addReviews, {
      onSuccess: () => {
        alert("Tạo review thành công!");
        queryClient.invalidateQueries(["getReviews"]);
      },
      onError: () => {
        alert("Tạo review thành công!");
      },
    });

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
        alert("Đã thêm sản phẩm vào giỏ hàng!");
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

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!userId) return;
    createReview({productId, userId, rating, reviewContent});
    
  };  

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.product_name}</h1>
      <div className="flex gap-8">
        {/* Phần hình ảnh sản phẩm */}
        <div className="w-1/2 h-auto">
          {product.image ? (
            <img
              src={product.image}
              alt={product.product_name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          ) : (
            <span className="text-gray-500 font-medium">Chưa có hình ảnh</span>
          )}
        </div>
  
        {/* Thông tin sản phẩm */}
        <div className="w-1/2 pl-8">
          <p className="text-xl font-semibold text-gray-900">Giá: {product.price} VND</p>
          <p className="text-gray-700 mt-2">Tồn kho: {product.stock}</p>
          <p className="text-gray-700 mt-2">{product.description}</p>
  
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
            className="mt-6 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
  
      {/* Phần đánh giá sản phẩm */}
      <section className="mt-12" aria-labelledby="reviews-section">
        <h2
          id="reviews-section"
          className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2"
        >
          Đánh giá sản phẩm
        </h2>

        {/* Hiển thị đánh giá nếu có */}
        {reviewData ? (
          <div className="space-y-8">
            {reviewData.map((review) => (
              <article
                key={review}
                className="p-6 border border-gray-300 rounded-xl shadow-md bg-white transition-shadow hover:shadow-xl"
                itemScope
                itemType="http://schema.org/Review"
              >
                {/* Tiêu đề đánh giá */}
                <header className="mb-4">
                  <meta itemProp="reviewRating" content="5" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1" itemProp="author">
                    Khách hàng #{review.customer_id}
                  </h3>
                </header>

                {/* Nội dung đánh giá */}
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>Đánh giá:</strong> {review.rating} SAO
                  </p>
                  <p className="mb-2">
                    <strong>Nội dung:</strong> {review.comment}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Chưa có đánh giá nào.</p>
          </div>
        )}

        {/* Form nhập đánh giá */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Đánh giá sản phẩm của bạn</h3>
          <form onSubmit={handleSubmitReview} className="p-5 border border-blue-500">
            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">
                Đánh giá (1-5 sao)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="reviewContent" className="block text-gray-700 font-semibold mb-2">
                Nội dung đánh giá
              </label>
              <textarea
                id="reviewContent"
                name="reviewContent"
                required
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
  
  
};

export default ProductDetail;
