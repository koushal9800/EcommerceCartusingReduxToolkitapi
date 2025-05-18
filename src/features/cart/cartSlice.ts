import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'ecommerce_cart';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  const storedCart = await AsyncStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
});

export const saveCart = createAsyncThunk(
  'cart/saveCart',
  async (cart: CartItem[]) => {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.findIndex(i => i.id === action.payload.id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    },

    clearCart: () => {
      return [];
    },
  },

  extraReducers: builder => {
    builder.addCase(loadCart.fulfilled, (_state, action) => action.payload);
  },
});


export const {addToCart,removeFromCart,clearCart} = cartSlice.actions
export default cartSlice.reducer