import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export type TLoginResponse = {
    token: string;
    customer: {
        customerID: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        address: string;
        role: string;
    };
}

type LoginInputs = {
    email: string;
    password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
    tagTypes: ['Login'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<TLoginResponse, LoginInputs>({
            query: (loginData) => ({
                url: 'customer/login',
                method: 'POST',
                body: loginData
            }),
            invalidatesTags: ['Login']
        })
    })
});