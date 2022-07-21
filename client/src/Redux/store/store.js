import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../slices/bookSlice";

const store = configureStore({
  reducer: {
    books: booksReducer
  }
})


export default store;
