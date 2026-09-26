import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((entry) => entry.id === id);

      if (!item || !Number.isInteger(quantity)) return;

      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
