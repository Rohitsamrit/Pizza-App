import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  loading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    getPizzasRequest(state) {
      state.loading = true;
    },
    getPizzasSuccess(state, action) {
      state.pizzas = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPizzasFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPizzaRequest(state) {
      state.loading = true;
    },
    addPizzaSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addPizzaFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getPizzaByIdRequest(state) {
      state.loading = true;
    },
    getPizzaByIdSuccess(state, action) {
      state.pizza = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPizzaByIdFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePizzaByIdRequest(state) {
      state.updateloading = true;
    },
    updatePizzaByIdSuccess(state) {
      state.updateloading = false;
      state.updatesuccess = true;
      state.updateerror = null;
    },
    updatePizzaByIdFail(state, action) {
      state.updateloading = false;
      state.updateerror = action.payload;
    },
  },
});

export const {
  getPizzasRequest,
  getPizzasSuccess,
  getPizzasFail,
  addPizzaRequest,
  addPizzaSuccess,
  addPizzaFail,
  getPizzaByIdRequest,
  getPizzaByIdSuccess,
  getPizzaByIdFail,
  updatePizzaByIdRequest,
  updatePizzaByIdSuccess,
  updatePizzaByIdFail,
} = pizzaSlice.actions;

export default pizzaSlice;
