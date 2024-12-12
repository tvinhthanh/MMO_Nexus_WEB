import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import * as apiClient from "../../api-client";
import { useNavigate } from "react-router-dom";

const MyDonHang: React.FC = () => {
  const { userId } = useAppContext();
  const navigate = useNavigate();

  const { data: ordersData, isLoading: isLoadingOrders, isError: isErrorOrders } = useQuery(
    ["getOrdersByUserId", userId],
    () => apiClient.getOrdersByUserId(userId as string),
    {
      enabled: !!userId, // Chỉ thực hiện khi có userId
      onError: (error) => {
        console.error("Error fetching orders:", error);
      },
    }
  );

  // Mutation để hủy đơn hàng
  const mutationCancelOrder = useMutation(
    (orderId: string) => apiClient.cancelOrder(orderId),
    {
      onSuccess: () => {
        console.log('Đơn hàng đã được hủy');
      },
      onError: (error) => {
        console.error('Error canceling order:', error);
      },
    }
  );

  if (isLoadingOrders) {
    return <span>Đang tải đơn hàng...</span>;
  }

  if (isErrorOrders) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-red-600">Không thể lấy thông tin đơn hàng</h2>
        <button 
          onClick={() => navigate("/product")}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg">
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  const handleCancelOrder = (orderId: string) => {
    const confirmed = window.confirm("Bạn muốn hủy đơn hàng này không?");
    if (confirmed) {
      mutationCancelOrder.mutate(orderId); 
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-400";  // Màu vàng cho Pending
      case "Shipped":
        return "text-blue-500";    // Màu xanh dương cho Shipped
      case "Delivered":
        return "text-green-500";   // Màu xanh lá cho Delivered
      case "Cancelled":
        return "text-red-600";     // Màu đỏ cho Cancelled
      case "Confirm":
        return "text-green-700";   // Màu xanh lá đậm cho Confirm
      case "Complete":
        return "text-gray-800";    // Màu đen cho Complete
      default:
        return "text-gray-500";    // Màu mặc định
    }
  };

  // Hiển thị đơn hàng
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Danh sách đơn hàng của bạn</h1>
      <div className="space-y-6">
        {ordersData && ordersData.length > 0 ? (
          ordersData.map((order: any) => (
            <div
              key={order.order_id}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">Đơn hàng #{order.order_id}</h3>
              <p className="text-gray-600">Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Tổng tiền: <span className="text-black font-bold">{order.totalAmount} VND</span></p>
              <p className="text-gray-600">Địa chỉ giao hàng: {order.shippingAddress}</p>
              <p className="text-gray-600">Phương thức thanh toán: {order.paymentMethod}</p>
              <p className={`text-lg font-semibold ${getStatusColor(order.orderStatus)}`}>
                Trạng thái: {order.orderStatus}
              </p>
              
              {order.orderStatus === "Pending" && (
                <button
                  onClick={() => handleCancelOrder(order.order_id)}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Hủy đơn
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700">Không có đơn hàng nào. Hãy tiếp tục mua hàng</p>
        )}
      </div>
    </div>
  );
};

export default MyDonHang;
