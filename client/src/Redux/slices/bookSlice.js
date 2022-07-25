import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
  booksCopy: [],
  booksDetail: {},
  genres: [],
  filterObject: {}
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
    getGenres(state, action) {
      state.genres = action.payload;
    },
    getFilters(state, action) {
      state.books = action.payload;
    },
    saveFilterObject(state, action) {
      state.filterObject[action.payload.key] = action.payload.value; 
    },
    resetFilters(state, action) {
      state.books = state.booksCopy;
    },
    resetObjectFilter(state,action) {
      state.filterObject = {};
    }
  },
});

export const {
  getBooks,
  searchBook,
  getDetail,
  clearDetail,
  getGenres,
  getFilters,
  resetFilters,
  resetObjectFilter,
  saveFilterObject
} = bookSlice.actions;

export default bookSlice.reducer;
