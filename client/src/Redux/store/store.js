import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../slices/bookSlice";
import shoppingCartReducer, { getTotals } from '../slices/shoping.slice';
import genreReducer from '../slices/genreSlice';
import authReducer from '../slices/authSlice';


const store = configureStore({
  reducer: {
    books: booksReducer,
    shoppingCart: shoppingCartReducer,
    auth: authReducer,
    genres: genreReducer,
  }
})
store.dispatch(getTotals())

export default store;
