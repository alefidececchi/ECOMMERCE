import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../slices/bookSlice";
import shoppingCartReducer, { getTotals } from '../slices/shoping.slice';
import genreReducer from '../slices/genreSlice';
import userReducer from '../slices/userSlice';
import tokenReducer from '../slices/tokenSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    shoppingCart: shoppingCartReducer,
    genres: genreReducer,
    users:userReducer,
    token:tokenReducer,
  }
})
store.dispatch(getTotals())

export default store;
