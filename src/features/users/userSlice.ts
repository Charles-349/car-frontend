import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Customer = {
  customerID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
};

export type UserState = {
  token: string | null;
  customer: Customer | null;
};

const initialState: UserState = {
  token: null,
  customer: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; customer: Customer }>
    ) => {
      state.token = action.payload.token;
      state.customer = action.payload.customer;
    },
    logout: (state) => {
      state.token = null;
      state.customer = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
