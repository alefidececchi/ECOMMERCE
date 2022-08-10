import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giftCards: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  userOwner: {},
};

const giftCardSlice = createSlice({
  name: "giftCards",
  initialState,
  reducers: {
    addGiftCard(state, action) {
      let id = state.giftCards.find(
        (card) => card.cardName === action.payload.cardName
      );
      if (!id) {
        state.giftCards.push(action.payload);
      }
    },
    resetGiftCards(state, action) {
      state.giftCards = [];
    },
    removeGiftCards(state, action) {
      state.giftCards = state.giftCards.filter(
        (card) => card.cardName !== action.payload
      );
    },
    sumQuantity(state, action) {
      let reference = state.giftCards.find(
        (card) => card.cardName === action.payload.cardName
      );
      reference.cartQuantity = action.payload.quantity;
      console.log(reference);
    },
    resQuantity(state, action) {
      let reference = state.giftCards.find(
        (card) => card.cardName === action.payload.cardName
      );
      if (action.payload.quantity === 0) {
        state.giftCards = state.giftCards.filter(
          (card) => card.cardName !== action.payload.cardName
        );
      } else {
        reference.cartQuantity = action.payload.quantity;
        console.log(reference);
      }
    },
    getTotalItems(state, action) {
      let counter = 0;
      let amount = 0;
      state.giftCards.forEach((card) => {
        counter = counter + card.cartQuantity;
        amount = amount + card.cartQuantity * card.price;
      });
      state.cartTotalQuantity = counter;
      state.cartTotalAmount = amount;
      JSON.stringify(window.localStorage.setItem('cartTotalAmount', state.cartTotalAmount))
    },
    loadUserOwner(state, action) {
      if(action.payload.length){
        state.userOwner = action.payload[0];
      }else{
        state.userOwner = true
      }
    },
    resetUserOwner(state, action) {
      state.userOwner = {};
    }
  },
});

export const {
  addGiftCard,
  removeGiftCards,
  sumQuantity,
  resQuantity,
  getTotalItems,
  loadUserOwner,
  resetUserOwner
} = giftCardSlice.actions;

export default giftCardSlice.reducer;
