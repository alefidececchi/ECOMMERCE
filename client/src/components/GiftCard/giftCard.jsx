import React, { useEffect } from "react";
import Cards from "./cards";
import s from "./giftCard.module.scss";
import Footer from "../Footer/footer";


const GiftCard = () => {
  


  return (
    <div className={s.main}>
      <h1>Gift Cards:</h1>
      <Cards />
      <Footer />
    </div>
  );
};

export default GiftCard;
