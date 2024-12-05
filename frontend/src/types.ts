export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  
  export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    image: string
;
    lastUpdated: Date;
    bookings: BookingType[];
  };
  export type StoreType = {
    store_id: string;
    _id: string;
    store_name: string;  
    user_id: string;     
    address: string;     
    image: string;      
    description: string;
    lastUpdated: Date;
  };
  
  export type BookingType = {
    storeId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
  };
  
  export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
  
  export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
  };

  export type RoomType = {
    
  }