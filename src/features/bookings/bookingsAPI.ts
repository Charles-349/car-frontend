import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

// Booking Type
export type TBooking = {
    bookingID: number;
    carID: number;
    customerID: number;
    rentalStartDate: string; 
    rentalEndDate: string;   
    totalAmount: number;
};

export const bookingsAPI = createApi({
    reducerPath: "bookingsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: APIDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Bookings"],
    endpoints: (builder) => ({
        createBooking: builder.mutation<TBooking, Partial<TBooking>>({
            query: (newBooking) => ({
                url: "/booking",
                method: "POST",
                body: newBooking,
            }),
            invalidatesTags: ["Bookings"],
        }),
        getBookings: builder.query<{ bookings: TBooking[] }, void>({
            query: () => "/booking",
            providesTags: ["Bookings"],
        }),
        getBookingById: builder.query<{ booking: TBooking }, number>({
            query: (bookingID) => `/booking/${bookingID}`,
            providesTags: ["Bookings"],
        }),
        getBookingsByCustomerId: builder.query<{ bookings: TBooking[] }, number>({
            query: (customerID) => `/booking/customer/${customerID}`,
            providesTags: ["Bookings"],
        }),
        updateBooking: builder.mutation<TBooking, Partial<TBooking> & { bookingID: number }>({
            query: (updatedBooking) => ({
                url: `/booking/${updatedBooking.bookingID}`,
                method: "PUT",
                body: updatedBooking,
            }),
            invalidatesTags: ["Bookings"],
        }),
        deleteBooking: builder.mutation<{ message: string }, number>({
            query: (bookingID) => ({
                url: `/booking/${bookingID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Bookings"],
        }),
    }),
});


