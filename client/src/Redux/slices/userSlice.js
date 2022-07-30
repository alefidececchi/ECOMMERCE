import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  userById:{}
 
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload;
    },
    getUserById (state, action) {
      state.userById = action.payload;
    },
    
  },
});

export const {
  getUsers,
  getUserById,
  
} = userSlice.actions;

export default userSlice.reducer;
