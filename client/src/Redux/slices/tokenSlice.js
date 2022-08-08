import { createSlice } from "@reduxjs/toolkit";
// const initialState = {

//     token:[],   
//     email:[]


// };
const initialState =
    localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        getToken(state, action) {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // console.log(state, action)

            state = action.payload;

            localStorage.setItem("token", JSON.stringify(state))
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
