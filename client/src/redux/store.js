import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice from "./features/pizzaSlice"; // Ensure the path is correct
import { userSlice } from "./features/userSlice";
import { alertSlice } from "./features/alertSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    pizzas: pizzaSlice.reducer,
    user: userSlice.reducer,
    alerts: alertSlice.reducer,

    cart: cartReducer,
  },
});
