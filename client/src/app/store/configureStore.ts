import { orderSlice } from './../../pages/orders/orderSlice';
import { catalogSlice } from './../../pages/catalog/catalogSlice';
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../pages/basket/BasketSlice";
import { counterSlice } from "../../pages/contact/counterSlice";
import { accountSlice } from '../../pages/account/accountSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
    order: orderSlice.reducer,
    account: accountSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
