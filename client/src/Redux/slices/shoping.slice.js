import { createSlice } from "@reduxjs/toolkit";
// import shining from '../../assets/shining.jpg'
import { toast } from "react-toastify";

export const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers:{
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            console.log(state.cartItems)
            console.log(action)
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {position: "bottom-left"})
            }
            else{
            const tempProduct = {...action.payload, cartQuantity: 1};
            state.cartItems.push(tempProduct)
            toast.success(`${action.payload.name} added to cart`, {position: "bottom-left"})
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} remove from cart`, {position: "bottom-left"})
            
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item._id === action.payload._id
            );
      
            if (state.cartItems[itemIndex].cartQuantity > 1) {
              state.cartItems[itemIndex].cartQuantity -= 1;
      
              toast.info(`Decreased ${action.payload.name} cart quantity`, {
                position: "bottom-left",
              });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
              const nextCartItems = state.cartItems.filter(
                (item) => item._id !== action.payload._id
              );
      
              state.cartItems = nextCartItems;
      
              toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left",
              });
            }
      
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          },
          clearCart(state, action){
            state.cartItems = []
            toast.error("Cart cleared", {
                position: "bottom-left",
              });
              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          },
          getTotals(state, action){
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) =>{
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
          }
        
    }
})

export const {
    addToCart,
    removeFromCart,
    decreaseCart,
    clearCart,
    getTotals} = shoppingSlice.actions

export default shoppingSlice.reducer