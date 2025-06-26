import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIDomain } from '../../utils/APIDomain';
import type { RootState } from '../../app/store';

export type TCustomer = {
    customerID: number; 
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: string;
    isVerified: boolean;    
    verificationCode: string;
    verificationCodeExpiresAt: Date;
};
export type TverifyUser = {
    email: string;
    code: string;
};
export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl : APIDomain,
        prepareHeaders: (headers, {getState}) => {
                  const token = (getState() as RootState).user.token;
                  if (token) {
                      headers.set('Authorization', `Bearer ${token}`);
                  }
                  headers.set('Content-Type', 'application/json');
                  return headers;
              }  
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        createCustomer: builder.mutation<TCustomer, Partial<TCustomer>>({
            query: (newCustomer) => ({
                url: '/customer',
                method: 'POST',
                body: newCustomer,
            }),
            invalidatesTags: ['Users'],
        }),
        VerifyUser: builder.mutation<{message:string}, TverifyUser >({
            query: (data) => ({
                url: '/customer/verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
    //     getUsers: builder.query<TCustomer[], void>({
    //         query: () => '/customer',
    //         providesTags: ['Users']
    // }),
    getUsers: builder.query<TCustomer[], void>({
    query: () => '/customer',
    transformResponse: (response: { customers: TCustomer[] }) => response.customers, // ✅ Fix here
    providesTags: ['Users'],
}),

    updateUser: builder.mutation<TCustomer, Partial<TCustomer> & { customerID: number }>({
            query: (updatedUser) => ({
                url: `/customer/${updatedUser.customerID}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: ['Users']
        }),
       getUserById: builder.query<{ customer: TCustomer }, number>({
    query: (customerID) => `/customer/${customerID}`,
    providesTags: ['Users'],
}),

    }),
})
    

