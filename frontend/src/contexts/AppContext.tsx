import React, { createContext, useContext, useState } from "react";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

interface Product {
  category_id: number;
  createdAt: string;
  description: string;
  image: string;
  price: string;
  product_id: number;
  product_name: string;
  stock: number;
  store_id: number;
  updatedAt: string;
}

type AppContextType = {
  showToast: (toast: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: any;
  userId: string | null;
  userRole: string | null;
  storeId: string | null;
  searchData: Product[];
  setUserData: (id: string, role: string) => void;
  setStoreId: (id: string) => void;
  setListSearch: (data: any) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<Product[]>([]);

  const showToast = (toast: ToastMessage) => setToast(toast);
  const isLoggedIn = !!userId;
  const stripePromise = Promise.resolve(null);

  const setUserData = (id: string, role: string) => {
    setUserId(id);
    setUserRole(role);
  };

  const setListSearch = (data: any) => {
    setSearchData(data);
    console.log("List search set:", data);
  };

  const setStoreIdWrapper = (id: string) => setStoreId(id);

  return (
    <AppContext.Provider
      value={{
        showToast,
        isLoggedIn,
        stripePromise,
        userId,
        userRole,
        storeId,
        searchData,
        setUserData,
        setStoreId: setStoreIdWrapper,
        setListSearch,
      }}
    >
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow ${toast.type === "SUCCESS" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.message}
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
