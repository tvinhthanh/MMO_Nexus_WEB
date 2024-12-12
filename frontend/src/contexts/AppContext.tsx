import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

// Stripe public key for loading Stripe
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

// Khai báo Toast message
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

//Khai báo AppContext
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
  userId: string | null;
  userRole: string | null;
  storeId: string | null;
  setUserData: (id: string, userRole: string) => void; 
  setStoreId: (storeId: string) => void; 
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

// Khởi tạo Stripe promise if the key exists
const stripePromise = STRIPE_PUB_KEY ? loadStripe(STRIPE_PUB_KEY) : Promise.resolve(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);

  const { isError, isLoading, data } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
    onSuccess: (data) => {
      if (data?.userId && data?.userRole) {
        setUserId(data.userId); 
        setUserRole(data.userRole); 
      }
    },
  });

  //Thực hiện khi userRole là "1"
  const { data: storeData } = useQuery(
    "fetchStore",
    () => apiClient.fetchMyStores(userId ?? ""),
    {
      enabled: !!userId && userRole == "1",
      onSuccess: (data) => {
        if (data && data.length > 0) {
          setStoreId(data[0].store_id);
        }
      },
    }
  );

  const isLoggedIn = !isError && !isLoading;
  const setUserData = (id: string, userRole: string) => {
    setUserId(id);
    setUserRole(userRole);
  };

  console.log(userId);
  console.log(storeId);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage); 
        },
        isLoggedIn,
        stripePromise, 
        userId, 
        userRole,
        storeId, 
        setStoreId, 
        setUserData,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children} {/* Render child components */}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
