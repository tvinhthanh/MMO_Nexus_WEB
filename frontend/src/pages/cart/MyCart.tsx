import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import * as apiClient from "../../api-client";
import { useNavigate } from "react-router-dom";

const MyCart: React.FC = () => {
  const { userId } = useAppContext(); 
  const navigate = useNavigate();

  const { data: cartData, isLoading: isLoadingCart, isError: isErrorCart } = useQuery(
    ["getCartByUserId", userId],
    () => apiClient.getCartByUserId(userId as string),
    {
      enabled: !!userId,
      onError: (error) => {
        console.error("Error fetching cart:", error);
      },
    }
  );

  // Fetch user data (including address) using getUserById
  const { data: userData, isLoading: isLoadingUser, isError: isErrorUser } = useQuery(
    ["getUserById", userId],
    () => apiClient.getUserById(userId as string),
    {
      enabled: !!userId,
      onError: (error) => {
        console.error("Error fetching user data:", error);
      },
    }
  );

  const { mutate: createOrder } = useMutation(apiClient.createOrder, {
    onError: (error) => {
      console.error("Error creating order:", error);
    },
    onSuccess: (data) => {
      if (data?.success) {
        window.location.reload();
      } else {
        alert("Tạo đơn hàng thất bại. Vui lòng thử lại.");
      }
    }
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("money"); // Default to "money"

  // Wait for cart and user data to load
  if (isLoadingCart || isLoadingUser) {
    return <span>Đang tải dữ liệu...</span>;
  }

  // Handle errors if data fails to load
  if (isErrorCart || isErrorUser) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Không thể lấy thông tin giỏ hàng hoặc người dùng</h2>
        <button 
          onClick={() => navigate("/product")}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg">
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  // Get total price of the cart
  const getTotalPrice = () => {
    return cartData.cart.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    if (!userData?.address) {
      alert("Vui lòng cung cấp địa chỉ giao hàng");
      return;
    }
  
    // Lấy store_id từ sản phẩm đầu tiên trong giỏ
    const storeId = cartData.cart[0]?.store_id;
  
    if (!storeId) {
      alert("Không thể xác định cửa hàng của đơn hàng");
      return;
    }
  
    const orderData = {
      customer_id: userId,
      orderDate: new Date().toISOString(),
      totalAmount: getTotalPrice(),
      orderStatus: "pending",
      shippingAddress: userData.address,
      paymentMethod: paymentMethod,
      store_id: storeId,
    };
  
    console.log("Order Data:", orderData); // Debug output
    await createOrder(orderData);
  };
  const handleQuantityChange = async (productId: string, action: "increase" | "decrease") => {
    const updatedCart = cartData.cart.map((item: any) => {
      if (item.product_id === productId) {
        if (action === "increase") {
          item.quantity += 1;
        } else if (action === "decrease") {
          item.quantity -= 1;
          if (item.quantity === 0) {
            return null;
          }
        }
      }
      return item;
    }).filter((item : any) => item !== null);

    // Update cart data via API
    // await updateCart({ userId, cart: updatedCart });
  };
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div className="space-y-6">
        {cartData.cart && cartData.cart.length > 0 ? (
          cartData.cart.map((item: any) => (
            <div
              key={item.product_id}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white flex items-center space-x-6"
            >
              <div>{item.store_id}</div>
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
                  onClick={() => handleQuantityChange(item.product_id, "decrease")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <p className="text-gray-600">{item.quantity}</p>
                <button
                  onClick={() => handleQuantityChange(item.product_id, "increase")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <p className="text-gray-600">
                  Tổng tiền: {item.price * item.quantity} VND
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Giỏ hàng của bạn trống.</p>
        )}

        {/* Payment Method Selection */}
        <div className="mt-6">
          <label htmlFor="paymentMethod" className="block text-lg font-semibold mb-2">Chọn phương thức thanh toán</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="money">Tiền mặt</option>
            <option value="credit_card">Thẻ tín dụng</option>
            <option value="paypal">PayPal</option>
            {/* Add other options if necessary */}
          </select>
        </div>

        {/* Cart Total and Checkout */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-xl font-bold">
            <p>Tổng giỏ hàng: {getTotalPrice()} VND</p>
          </div>
          <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
