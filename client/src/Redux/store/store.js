import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../slices/bookSlice";
import shoppingCartReducer, { getTotals } from '../slices/shoping.slice';
import genreReducer from '../slices/genreSlice';
import authReducer from '../slices/authSlice';
import wishListReducer from '../slices/wishListSlice';
import userReducer from '../slices/userSlice';
import tokenReducer from '../slices/tokenSlice';
import ordersSlice from '../slices/ordersSlice';


const store = configureStore({
  reducer: {
    books: booksReducer,
    shoppingCart: shoppingCartReducer,
    auth: authReducer,
    genres: genreReducer,
    wishList: wishListReducer,
    users: userReducer,
    token: tokenReducer,
    orders: ordersSlice
  }
})
store.dispatch(getTotals())

export default store;
