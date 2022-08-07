import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
}

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    getBooks(state, action) {
      state.books = action.payload
    }
  }
})

export const { getBooks } = dealsSlice.actions;

export default dealsSlice.reducer;