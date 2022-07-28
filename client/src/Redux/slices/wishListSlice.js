import { createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  wishList: []
}

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    getWishList(state, action) {
      let id = state.wishList.find((book) => book._id === action.payload._id);
      if(!id) {
        state.wishList.push(action.payload);
        toast.success('Book added to wish list.', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else {
        toast.info('The book is already on the wish list.', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      console.log(action.payload._id);
    },
    removeBook(state, action) {
      state.wishList = state.wishList.filter(book => book._id !== action.payload)
    }
  }

})

export const {getWishList, removeBook} = wishListSlice.actions;

export default wishListSlice.reducer;