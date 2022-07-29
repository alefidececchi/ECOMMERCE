import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    token:[],   
    email:[]


};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        getToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(state.token))
        },
        getEmail(state, action) {
            state.email = action.payload;
            localStorage.setItem("email", JSON.stringify(state.email))
        },

    },
});


export const {
    getToken,
    getEmail,

} = tokenSlice.actions;

export default tokenSlice.reducer;
