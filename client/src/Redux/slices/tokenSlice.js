import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : [],


};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        getToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(state.token))
        },

    },
});

export const {
    getToken,

} = tokenSlice.actions;

export default tokenSlice.reducer;
