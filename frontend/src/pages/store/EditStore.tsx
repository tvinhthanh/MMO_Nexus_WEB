import React, { useState, useEffect } from "react";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const EditStore: React.FC = () => {
  const { userId } = useAppContext();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        if (!storeId) return;
        const storeData = await apiClient.getStoreById(storeId);
        setStoreName(storeData.store_name);
        setAddress(storeData.address);
        setCurrentImage(storeData.image);
      } catch (error) {
        console.error("Error fetching store data:", error);
        alert("Failed to fetch store data");
      }
    };
    fetchStoreData();
  }, [storeId]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      alert("User ID is missing. Please log in.");
      return;
    }

    if (!storeName || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const payload: any = {
      user_id: userId,
      store_name: storeName,
      address: address,
      image: currentImage,
    };

    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        payload.image = reader.result as string;
        sendStoreData(payload);
      };

      reader.readAsDataURL(image);
    } else {
      sendStoreData(payload);
    }
  };

  const sendStoreData = async (payload: any) => {
    try {
      const response = await apiClient.UpdateStore(storeId as string, payload);
      alert("Store updated successfully!");
      navigate(`/store/${storeId}`);
    } catch (error) {
      console.error("Error updating store:", error);
      alert("Failed to update store");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Sửa thông tin cửa hàng</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="storeName" className="text-sm font-semibold">
            Tên cửa hàng:
          </label>
          <input
            id="storeName"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-semibold">
            Địa chỉ:
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-semibold">
            Hình ảnh:
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            accept="image/*"
          />
        </div>

        {currentImage && !imagePreview && (
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Hình ảnh hiện tại:</label>
            <img src={currentImage} alt="Store" className="w-40 h-40 object-cover rounded-md" />
          </div>
        )}

        {imagePreview && (
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Hình ảnh chọn mới:</label>
            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-black-600"
        >
          Cập nhật thông tin cửa hàng
        </button>
      </form>
    </div>
  );
};

export default EditStore;
