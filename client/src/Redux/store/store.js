import { configureStore, createStore } from '@reduxjs/toolkit';
import { shoppingReducer } from './reducers/shoppingReducer';


const store = createStore(shoppingReducer)




export default store;