import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import * as apiClient from "../../api-client";
import { useNavigate } from "react-router-dom";

const MyCart: React.FC = () => {
  const { userId } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch cart data
  const { data: cartData, isLoading: isLoadingCart, isError: isErrorCart } = useQuery(
    ["getCartByUserId", userId],
    () => apiClient.getCartByUserId(userId as string),
    { enabled: !!userId }
  );

  // Fetch user data
  const { data: userData, isLoading: isLoadingUser, isError: isErrorUser } = useQuery(
    ["getUserById", userId],
    () => apiClient.getUserById(userId as string),
    { enabled: !!userId }
  );

  const [paymentMethod, setPaymentMethod] = useState<string>("money");

  // Create order mutation
  const { mutate: createOrder, isLoading: isCreatingOrder } = useMutation(apiClient.createOrder, {
    onSuccess: () => {
      alert("Tạo đơn hàng thành công!");
      queryClient.invalidateQueries(["getCartByUserId"]);
    },
    onError: () => {
      alert("Tạo đơn hàng thành công!");
    },
  });

  const { mutate: removeItemFromCart } = useMutation(apiClient.removeItemFromCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCartByUserId"]);
    },
    onError: () => {
      alert("Có lỗi xảy ra khi xóa sản phẩm.");
    },
  });

  // Clear cart mutation
  const { mutate: clearCart } = useMutation(apiClient.clearCart, {
    onSuccess: () => {
      alert("Giỏ hàng đã được xóa toàn bộ.");
      queryClient.invalidateQueries(["getCartByUserId"]);
    },
    onError: () => {
      alert("Xóa toàn bộ giỏ hàng thành công.");
    },
  });

  const handleCheckout = () => {
    if (!userData?.address) {
      alert("Vui lòng cung cấp địa chỉ giao hàng");
      return;
    }
    if (cartData?.cart?.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const storeId = cartData.cart[0]?.store_id || null;
    if (!storeId) {
      alert("Không xác định được cửa hàng.");
      return;
    }

    const orderData = {
      customer_id: userId,
      orderDate: new Date().toISOString(),
      totalAmount: getTotalPrice(),
      orderStatus: "pending",
      shippingAddress: userData.address,
      paymentMethod,
      store_id: storeId,
    };

    createOrder(orderData);
  };

  const handleRemoveItem = (productId: string) => {
    if (!userId) return;
    removeItemFromCart(productId);
    console.log(productId)
  };

  const handleClearCart = () => {
    if (!userId) return;
    clearCart(userId);
  };

  const getTotalPrice = () => {
    return cartData?.cart.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  };

  if (isLoadingCart || isLoadingUser) return <p>Đang tải dữ liệu...</p>;
  if (isErrorCart || isErrorUser)
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Không thể tải dữ liệu</h2>
        <button
          onClick={() => navigate("/product")}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      {cartData.cart.length > 0 ? (
        <div>
          {cartData.cart.map((item: any) => (
            <div
              key={item.product_id}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white flex items-center space-x-6"
            >
              {/* Product Image */}
              <div className="w-20 h-20 overflow-hidden bg-gray-100 flex items-center justify-center rounded">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Chưa có hình ảnh</span>
                )}
              </div>

              {/* Product Information */}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{item.product_name}</h3>
                <p className="text-gray-600">Giá: {item.price} VND</p>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleRemoveItem(item.product_id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <p className="text-gray-600">{item.quantity}</p>
                <button
                  onClick={() => handleRemoveItem(item.product_id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <p className="text-gray-600">
                  Tổng tiền: {item.price * item.quantity} VND
                </p>
              </div>

              <button
                onClick={() => handleRemoveItem(item.product_id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Xóa
              </button>
            </div>
          ))}
          <button onClick={handleClearCart} className="text-red-500 float-right">
            Xóa toàn bộ giỏ hàng
          </button>
        </div>
      ) : (
        <p>Giỏ hàng trống.</p>
      )}

      <div className="mt-6">
        <label>Phương thức thanh toán:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="money">Tiền mặt</option>
          <option value="credit_card">Thẻ tín dụng</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <div className="mt-6">
        <p>Tổng tiền: {getTotalPrice()} VND</p>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          disabled={isCreatingOrder}
        >
          {isCreatingOrder ? "Đang xử lý..." : "Thanh toán"}
        </button>
      </div>
    </div>
  );
};

export default MyCart;
