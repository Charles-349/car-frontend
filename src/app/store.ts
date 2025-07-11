
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../features/users/userAPI";
import { persistReducer, persistStore } from "redux-persist";
import { loginAPI } from "../features/login/loginAPI";
import userSlice from "../features/users/userSlice";
import { carsAPI } from "../features/cars/carsAPI";
import { bookingsAPI } from "../features/bookings/bookingsAPI";
import { paymentsAPI } from "../features/payments/paymentsAPI";






const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user', 'admin']
}
const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [carsAPI.reducerPath]: carsAPI.reducer,
    [bookingsAPI.reducerPath]:bookingsAPI.reducer,
    [paymentsAPI.reducerPath]:paymentsAPI.reducer,
    user: userSlice,
   
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(userAPI.middleware)
    .concat(loginAPI.middleware)
    .concat(carsAPI.middleware)
    .concat(bookingsAPI.middleware)
    .concat(paymentsAPI.middleware)
});
export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
    