import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  StoreType,
} from "./types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      let errorMessage = "An error occurred while processing your request.";
      try {
        const responseBody = await response.json();
        errorMessage = responseBody?.message || errorMessage;
      } catch (err) {
        console.error("Error parsing response body:", err);
      }
      throw new Error(errorMessage);
    }
  
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message); // Log to the console for debugging
      throw new Error(error.message);
    }
    throw new Error("Something went wrong.");
  }  
};

export const validateToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",  // Include credentials like cookies (if needed)
    });

    if (!response.ok) {
      // Log the response status and body for debugging purposes
      const errorDetails = await response.text();
      console.error("Token validation failed: ", errorDetails);
      throw new Error("Token is invalid or expired.");
    }

    // Return the parsed JSON response
    return response.json();
  } catch (error) {
    console.error("Error during token validation: ", error);
    throw new Error("Something went wrong during token validation.");
  }
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const addMyStore = async (formData: FormData) => {
  try {
    // Gửi formData lên API
    const response = await fetch(`${API_BASE_URL}/api/store`, {
      method: 'POST',
      body: formData, // Gửi formData thay vì JSON
    });

    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add store');
    }

    // Trả về dữ liệu thành công nếu có
    const data = await response.json();
    return data;
  } catch (error) {
    // Xử lý lỗi khi gửi hoặc nhận phản hồi
    console.error('Error adding store:', error);
    throw error;
  }
};



export const getMyStore = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/store/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch store information.");
  }

  return response.json();
};

export const fetchMyStores = async (userId: string): Promise<StoreType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/store/user/${userId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching stores");
  }

  return response.json();
};


export const deleteCategoryById = async (categoryId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/${categoryId}`, {
      method: 'DELETE', // Use the DELETE method to remove the store
    });

    if (!response.ok) {
      throw new Error('Failed to delete store');
    }

    const result = await response.json();
    return result; // You can return the result to handle the success message on the frontend
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error; // You can throw the error or return a custom message to the frontend
  }
};

export const getCategoriesByStore = async (storeId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/store/${storeId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON data from the response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching categories by store:', error);
    throw error; // Re-throw error to be handled in the component
  }
};

export const getStoreById = async (storeId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/store/${storeId}`); // Adjust the URL to your API endpoint
  if (!response.ok) {
    throw new Error('Failed to fetch store data');
  }
  const data = await response.json();
  return data; // Assuming your API responds with the store data
};

export const updateStoreById = async (storelId: string, formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/store/${storelId}`, {
    method: 'PUT', // Use the PUT method for update
    headers: {
      // No need for Content-Type when sending FormData
      // Content-Type: 'multipart/form-data', // this is set automatically with FormData
    },
    body: formData, // Send the FormData with the store details
  });

  if (!response.ok) {
    throw new Error('Failed to update store');
  }

  const data = await response.json();
  return data; // Assuming your API responds with updated store data
};

export const deleteStoreById = async (storeId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/store/${storeId}`, {
      method: 'DELETE', // Use the DELETE method to remove the store
    });

    if (!response.ok) {
      throw new Error('Failed to delete store');
    }

    const result = await response.json();
    return result; // You can return the result to handle the success message on the frontend
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error; // You can throw the error or return a custom message to the frontend
  }
};

export const clearCart = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/carts/clear/${userId}`, {
    method: 'PUT'
  });

  if (!response.ok) {
    throw new Error('Không thể xóa giỏ hàng');
  }

  return response.json(); // Return the response from backend
};

export const removeItemFromCart = async (userId : string, productId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/carts/${userId}/items/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }

  return response.json();
};


export const searchProducts = async (name: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/search/${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    return response.json();
  } catch (error) {
    console.error("Error during product search:", error);
    throw error;
  }
};

export const createProduct = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      body: formData, // Chuyển FormData vào body
    });

    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Error:', errorData); // In lỗi server ra console
      throw new Error(errorData.message || 'Failed to add product');
    }

    // Nếu thành công, lấy dữ liệu trả về từ API
    const data = await response.json();
    console.log('Product created successfully:', data); // In ra dữ liệu sản phẩm mới
    return data; // Trả về dữ liệu sản phẩm được tạo hoặc thông báo thành công
  } catch (error) {
    // Xử lý lỗi
    console.error('Error creating product:', error);
    throw error; // Ném lại lỗi để xử lý trong component
  }
};


export const getProductsByStore = async (storeId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/store/${storeId}`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON data from the response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching products by store:', error);
    throw error; // Re-throw error to be handled in the component
  }
};
export const getProductById = async (productId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy sản phẩm");
  }
  return response.json();
};

export const addToCart = async (user_id: string, product_id: string, product_name:string, quantity:number,price: number, image:string,store_id:string) => {
  try {
    const cartData = {
      "user_id": user_id,
      "product_id": product_id,
      "product_name":product_name,
      "quantity":quantity,
      "price":price,
      "image":image,
      "store_id":store_id
    };

    const response = await fetch(`${API_BASE_URL}/api/carts`, {
      method: "PUT", // HTTP POST request
      headers: {
        "Content-Type": "application/json", // Content type is JSON
      },
      body: JSON.stringify(cartData), // Convert cart data to JSON
    });

    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      throw new Error(`Failed to add product to cart, status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    return data; // Return the response data (e.g., the new cart item)
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error; // Propagate the error for the calling function to handle
  }
};

export const getCartByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const updateCart = async (data: { userId: string;productId: string, cart: any[] }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts/${data.userId}/${data.productId}`, {
      method: "PATCH",  // hoặc "PATCH" tùy theo cách bạn cập nhật dữ liệu
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: data.cart }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }), // Sending the new status in the request body
      credentials: 'include', // Include credentials like cookies (if needed)
    });

    if (!response.ok) {
      // Log the response status and body for debugging purposes
      const errorDetails = await response.text();
      console.error("Failed to update order status: ", errorDetails);
      throw new Error("Failed to update order status.");
    }

    // Return the parsed JSON response (updated order details or success confirmation)
    return response.json();
  } catch (error) {
    console.error("Error updating order status: ", error);
    throw new Error("Something went wrong during updating order status.");
  }
};

export const getOrdersByStoreId = async (storeId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return await response.json();  // Trả về danh sách đơn hàng dưới dạng JSON
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Failed to delete order");
    }
    return await response.json();  // Trả về phản hồi từ API sau khi xóa đơn hàng
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to cancel order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error canceling order:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    
    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      throw new Error(`Failed to fetch products, status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    return data;  // Return the product data from the API response
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // You can handle the error as needed in your application
  }
};
export const deleteProductById = async (productId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: 'DELETE', // Sử dụng DELETE để xóa sản phẩm
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    const result = await response.json(); // Parse response (nếu có)
    return result; // Trả về kết quả
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; // Re-throw error để xử lý tại component
  }
};
export const updateProduct = async (productData: {
  product_id: string;
  product_name: string;
  price: number;
  stock: number;
  description: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productData.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData), // Gửi dữ liệu sản phẩm dưới dạng JSON
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const result = await response.json(); // Parse response
    return result; // Trả về kết quả
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; // Re-throw error để xử lý tại component
  }
};

export const createCategory = async (data: {
  category_name: string;
  description: string;
  store_id: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();

};

export const updateCategory = async (data: {
  category_id: string;
  category_name: string;
  description: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/${data.category_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: data.category_name,
        description: data.description,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update category. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};
