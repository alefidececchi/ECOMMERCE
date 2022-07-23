import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../slices/bookSlice";
import shoppingCartReducer from '../slices/shoping.slice'

const store = configureStore({
  reducer: {
    books: booksReducer,
    shoppingCart: shoppingCartReducer
  }
})


export default store;
