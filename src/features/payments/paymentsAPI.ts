import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TPayment = {
  paymentID: number;
  bookingID: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
};

export const paymentsAPI = createApi({
  reducerPath: "paymentsAPI",
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
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    createPayment: builder.mutation<TPayment, Partial<TPayment>>({
      query: (newPayment) => ({
        url: "/payment",
        method: "POST",
        body: newPayment,
      }),
      invalidatesTags: ["Payments"],
    }),
    getPayments: builder.query<{ payments: TPayment[] }, void>({
      query: () => "/payment",
      providesTags: ["Payments"],
    }),
    updatePayment: builder.mutation<TPayment, Partial<TPayment> & { paymentID: number }>({
      query: (updatedPayment) => ({
        url: `/payment/${updatedPayment.paymentID}`,
        method: "PUT",
        body: updatedPayment,
      }),
      invalidatesTags: ["Payments"],
    }),
    deletePayment: builder.mutation<{ success: boolean; paymentID: number }, number>({
      query: (paymentID) => ({
        url: `/payment/${paymentID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
    getPaymentById: builder.query<{ payment: TPayment }, number>({
      query: (paymentID) => `/payment/${paymentID}`,
      providesTags: ["Payments"],
    }),
    getPaymentsByCustomerId: builder.query<
      { payments: TPayment[] },
      number
    >({
      query: (customerID) => `/customer/${customerID}/bookings-payments`,
      transformResponse: (response: {
        customerID: number;
        bookings: { payments: TPayment[] }[];
      }) => {
        const payments = response.bookings.flatMap(b => b.payments || []);
        return { payments };
      },
      providesTags: ["Payments"],
    }),
  }),
});
