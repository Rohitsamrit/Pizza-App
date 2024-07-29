// src/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper functions to get and set cart state in local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState() || {
  cartItems: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.name === item.name && x.varient === item.varient
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      state.cartCount += item.quantity;
      saveState(state); // Save updated state to local storage
    },
    removeFromCart(state, action) {
      const { name, varient } = action.payload;
      const itemToRemove = state.cartItems.find(
        (x) => x.name === name && x.varient === varient
      );
      if (itemToRemove) {
        state.cartCount -= itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(
          (x) => x.name !== name || x.varient !== varient
        );
      }
      saveState(state); // Save updated state to local storage
    },
    updateQuantity(state, action) {
      const { name, varient, quantity } = action.payload;
      const item = state.cartItems.find(
        (item) => item.name === name && item.varient === varient
      );
      if (item) {
        item.quantity = quantity;
      }
      saveState(state); // Save updated state to local storage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
