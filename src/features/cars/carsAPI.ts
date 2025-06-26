import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APIDomain } from "../../utils/APIDomain"
import type { RootState } from "../../app/store"




export type TCar = {

     "carID": number,
            "carModel": string,
            "year": string
            "color": string,
            "rentalRate": number,
            "availability": boolean,
            "locationID": number,
}
export const carsAPI = createApi({
    reducerPath: 'carsAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: APIDomain,
       prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token; 
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); 
            }
            headers.set('Content-Type', 'application/json'); 
            return headers; 
        }
    }),
    tagTypes: ['Cars'],
    endpoints: (builder) => ({
        createCar: builder.mutation<TCar, Partial<TCar>>({
            query: (newCar) => ({
                url: '/car',
                method: 'POST',
                body: newCar,
            }),
            invalidatesTags: ['Cars'],
        }),
        getCars: builder.query<{cars:TCar[]}, void>({
            query: () => '/car',
            providesTags: ['Cars'],
        }),
       updateCar: builder.mutation<TCar, Partial<TCar> & { carID: number }>({
        query:(updatedCar) => ({
            url:`/car/${updatedCar.carID}`,
            method: 'PUT',
            body: updatedCar,
        }),
        invalidatesTags: ['Cars'],
    }),
        deleteCar: builder.mutation<{ success:boolean, carID:number }, number>({
            query: (carID) => ({
                url: `/car/${carID}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cars'],
        }),
        getCarById: builder.query<{ car: TCar }, number>({
    query: (carID) => `/car/${carID}`,
    providesTags: ['Cars'],
}),
    }),
    
    })
        