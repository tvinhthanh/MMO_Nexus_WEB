import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { useAppContext } from "../../contexts/AppContext";

const MyStore = () => {
  const { userId, storeId } = useAppContext();
  const navigate = useNavigate();

  const { data: storeData, isLoading, isError } = useQuery(
    "fetchMyStore",
    () => apiClient.fetchMyStores(userId ?? ""),
    { onError: () => {} }
  );

  const handleDelete = (storeId: string) => {
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa cửa hàng này?");
    if (confirmDelete) {
      apiClient
        .deleteStoreById(storeId)
        .then(() => {
          alert("Cửa hàng đã được xóa thành công!");
          navigate("/add-store"); // Điều hướng tới trang thêm cửa hàng
        })
        .catch((error) => {
          console.error("Error deleting store:", error);
          alert("Có lỗi xảy ra khi xóa cửa hàng.");
        });
    }
  };

  if (isLoading) return <span>Đang tải...</span>;

  if (isError || !storeData || storeData.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Bạn chưa có cửa hàng nào</h2>
        <Link
          to="/add-store"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500"
        >
          Thêm cửa hàng mới
        </Link>
      </div>
    );
  }

  const store = storeData[0]; // Vì mỗi user chỉ có một cửa hàng

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Thông tin cửa hàng</h1>
      <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden flex items-center">
        {/* Hình ảnh cửa hàng bên trái */}
        <div className="w-1/3 p-4">
          {store.image ? (
            <img
              src={store.image}
              alt={store.store_name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Thông tin cửa hàng bên phải */}
        <div className="w-2/3 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{store.store_name}</h2>
          <p className="text-gray-600 flex items-center">
            <BsMap className="mr-2 text-blue-500" /> {store.address}
          </p>
          <p className="text-gray-600 flex items-center">
            <BsBuilding className="mr-2 text-green-500" /> Store ID: {store.store_id}
          </p>
          <div className="flex justify-end space-x-4">
            <Link
              to={`/edit-store/${store.store_id}`}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
            >
              Chỉnh sửa
            </Link>
            <button
              onClick={() => handleDelete(store.store_id)}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500"
            >
              Xóa cửa hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStore;
