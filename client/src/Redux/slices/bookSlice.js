
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    books: [],

};



const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        getBooks(state, action) {
            state.books = action.payload;
            // state.videogamesCopy = action.payload;
        },
    },
});

export const {
    getBooks,
  
  } = bookSlice.actions;

export default bookSlice.reducer;