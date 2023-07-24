// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      state.push({ product: action.payload, quantity: 1 });
    },
    remove(state, action) {
      return state.filter((item) => item.product.id !== action.payload);
    },
    incrementQuantity(state, action) {
      const productId = action.payload;
      const cartItem = state.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const productId = action.payload;
      const cartItem = state.find((item) => item.product.id === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    },
  },
});

export const { add, remove, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
