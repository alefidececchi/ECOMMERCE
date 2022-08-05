import React, { useState } from "react";
import Cards from "./cards";
import { useSelector, useDispatch } from "react-redux";
import s from "./giftCard.module.scss";
import Footer from "../Footer/footer";
import { url } from "../../Redux/slices/api";
import { AiFillGift } from "react-icons/ai";
import axios from "axios";
import { addGiftCard } from "../../Redux/slices/giftCardSlice";

const GiftCard = () => {
  // const dispatch = useDispatch();
  // const { giftCards } = useSelector((state) => state.giftCard);
  // const user = JSON.parse(window.localStorage.getItem("usuario"));

  // let templateCard = {
  //   image:
  //     "https://d2j6dbq0eux0bg.cloudfront.net/default-store/giftcards/gift_card_003_1500px.jpg",
  //   cardName: "",
  //   name: "Gift Card",
  //   price: 0,
  //   desc: "A great gift giftr your friends",
  //   cartQuantity: 0,
  //   userId: user._id,
  //   cartTotalQuantity: 0,
  //   cartTotalAmount: 0,
  // };

  // const handleBuy = (e) => {
  //   dispatch(
  //     addGiftCard({
  //       ...templateCard,
  //       cardName: e.target.name,
  //     })
  //   );
  // };

  // const { token } = useSelector((state) => state.auth);
  // const [cartItems, setCartItems] = useState([initialState]);
  // const handleCheckout = async (e) => {
  //   setCartItems([{
  //     ...initialState,
  //     price: 10,
  //     userId: window.localStorage.getItem('usuario._id'),
  //     cartTotalAmount: 10
  //   }]
  //   )

  //   // console.log(cartItems);

  //   if (token) {
  //     axios.post(`${url}/stripe/create-checkout-session`, {
  //       cartItems,
  //       userId: user._id
  //     }).then(response => {
  //       if(response.data.url) {
  //         window.location.href = response.data.url
  //       }
  //     }).catch(error => console.log(error));
  //   } else {
  //     alert("debes iniciar sesión");
  //   }
  // };

  return (
    <div className={s.main}>
      <h1>Gift Cards:</h1>
      <Cards />

      <Footer />
    </div>
  );
};

export default GiftCard;
