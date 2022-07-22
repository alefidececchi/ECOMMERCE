import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";

import shoppingReducer from './shoppingSlice/shoping.slice'


const store = configureStore({
    reducer: {
        shopping: shoppingReducer
    }
})

export default store
