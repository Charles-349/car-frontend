import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIDomain } from '../../utils/APIDomain';

export type TCustomer = {
    id: number; 
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
        baseUrl : APIDomain
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
    })
    })

