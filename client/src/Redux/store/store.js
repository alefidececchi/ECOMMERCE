import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../slices/bookSlice";
import shoppingCartReducer, { getTotals } from '../slices/shoping.slice';
import genreReducer from '../slices/genreSlice';
import userReducer from '../slices/userSlice';


const store = configureStore({
  reducer: {
    books: booksReducer,
    shoppingCart: shoppingCartReducer,
    genres: genreReducer,
    users:userReducer,
  }
})
store.dispatch(getTotals())

export default store;
