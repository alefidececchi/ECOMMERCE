import React from "react";
import s from "./giftCard.module.scss";
import Footer from "../Footer/footer";
import { AiFillGift } from "react-icons/ai";

const GiftCard = () => {
  return (
    <div className={s.main}>
      <h1>Gift Cards:</h1>
      <section>
        <div className={s.cardContainer}>
          <AiFillGift className={s.icon}/>
          <div className={s.infoContainer}>
          <span>Gift Card</span>
          <h3>$ 10</h3>
          <button>Buy</button>
          </div>
        </div>

        <div className={s.cardContainer}>
          <AiFillGift className={s.icon}/>
          <div className={s.infoContainer}>
          <span>Gift Card</span>
          <h3>$ 40</h3>
          <button>Buy</button>
          </div>
        </div>

        <div className={s.cardContainer}>
          <AiFillGift className={s.icon}/>
          <div className={s.infoContainer}>
          <span>Gift Card</span>
          <h3>$ 100</h3>
          <button>Buy</button>
          </div>
        </div>

      </section>
      <Footer />
    </div>
  );
};

export default GiftCard;
