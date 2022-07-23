import { createSlice } from "@reduxjs/toolkit";
import shining from '../../assets/shining.jpg'

export const initialState = {
    products: [
        {id: 1, name:'Product 1', price: 100, image: shining, description: 'The Shining mainly takes place in the fictional Overlook Hotel, an isolated, haunted resort hotel located in the Colorado Rockies.'},
        {id: 2, name:'Product 2', price: 200, image: shining, description: 'The Shining mainly takes place in the fictional Overlook Hotel, an isolated, haunted resort hotel located in the Colorado Rockies.'},
        {id: 3, name:'Product 3', price: 300, image: shining, description: 'The Shining mainly takes place in the fictional Overlook Hotel, an isolated, haunted resort hotel located in the Colorado Rockies.'},
        {id: 4, name:'Product 4', price: 400, image: shining, description: 'The Shining mainly takes place in the fictional Overlook Hotel, an isolated, haunted resort hotel located in the Colorado Rockies.'},
        {id: 5, name:'Product 5', price: 500, image: shining, description: 'The Shining mainly takes place in the fictional Overlook Hotel, an isolated, haunted resort hotel located in the Colorado Rockies.'},
        {id: 6, name:'Product 6', price: 600, image: shining, description: 'The Shining mainly takes place in the fictional Overlook Hotel, an isolated, haunted resort hotel located in the Colorado Rockies.'},
    ],
    cart: []
}

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers:{
        ADD_TO_CART(state, action){
            let newItem = state.products.find(
                (product) => product.id === action.payload
              );
              //console.log(newItem);
        
              let itemInCart = state.cart.find((item) => item.id === newItem.id);
        
              return itemInCart
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                      item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    ),
                  }
                : {
                    ...state,
                    cart: [...state.cart, { ...newItem, quantity: 1 }],
                  }
        },

        REMOVE_ONE_FROM_CART(state, action){
            let itemToDelete = state.cart.find(item => item.id === action.payload)

            return itemToDelete.quantity > 1 ? {
                ...state,
                cart: state.cart.map(item => item.id === action.payload ? {...item, quantity: item.quantity - 1} : item)
            } : {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        },

        REMOVE_ALL_FROM_CART(state, action){
            return{
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload)
            }
        },

        CLEAR_CART(state, action){
            return initialState
        }
    }
})

export const {
    ADD_TO_CART,
    REMOVE_ONE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART} = shoppingSlice.actions

export default shoppingSlice.reducer