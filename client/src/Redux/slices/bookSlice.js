
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    books: [],
    booksCopy: [],
    booksDetail: {},

};



const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        getBooks(state, action) {
            state.books = action.payload;
            state.booksCopy = action.payload;
        },
        searchBook(state, action) {
            state.books = action.payload;
        },
        getDetail(state, action) {
            state.booksDetail = action.payload;
        },
        clearDetail(state, action) {
            state.booksDetail = {};
        },
    },

});



export const {
    getBooks, searchBook, getDetail, clearDetail,

} = bookSlice.actions;

export default bookSlice.reducer;