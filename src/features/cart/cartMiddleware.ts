import { Middleware } from '@reduxjs/toolkit';
import { saveCart } from './cartSlice';

export const cartMiddleware: Middleware = store => next => action => {
  const result = next(action);

  const watchedActions = ['cart/addToCart', 'cart/removeFromCart', 'cart/clearCart'];
  if (watchedActions.includes(action.type)) {
    const cart = store.getState().cart;
    store.dispatch(saveCart(cart));
  }

  return result;
};
