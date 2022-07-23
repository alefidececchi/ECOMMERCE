import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
  booksCopy: [],
  genres: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks(state, action) {
      state.books = action.payload;
      state.booksCopy = action.payload;
    },
		getGenres(state, action) {
			state.genres = action.payload;
		},
		getFilters(state, action) {
			state.books = action.payload
		},
		resetFilters(state, action) {
			state.books = state.booksCopy
		}
  },
});

export const { 
	getBooks,
	getGenres,
	getFilters,
	resetFilters
 } = bookSlice.actions;

export default bookSlice.reducer;
