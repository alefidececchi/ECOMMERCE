import s from "./giftCard.module.scss";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../Redux/slices/api";
import { toast } from "react-toastify";

const Checkout = ({ cartItems }) => {
  const { token } = useSelector((state) => state.auth);
  
  const user = JSON.parse(window.localStorage.getItem("usuario"));

  const handleCheckout = (userProps) => {
    // console.log(cartItems);
    if (token) {
      // console.log(user._id);
      axios
        .post(`api/stripe/create-checkout-giftCardsession`, {
          cartItems,
          userId: userProps._id,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      toast.error(`First you must be login`, { position: "top-center" });
    }
  };

  return (
    <div className={s.checkButton}>
      <button onClick={() => handleCheckout(user)}>Checkout</button>
    </div>
  );
};

export default Checkout;
