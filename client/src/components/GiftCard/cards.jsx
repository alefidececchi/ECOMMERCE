import s from "./giftCard.module.scss";
import React from "react";
import cardImage from "./giftCard.PNG";
import Checkout from "./checkout";
import { BsFillXCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiFillGift } from "react-icons/ai";
import {
  addGiftCard,
  removeGiftCards,
  sumQuantity,
  resQuantity,
  getTotalItems,
} from "../../Redux/slices/giftCardSlice";

const Cards = () => {
  const dispatch = useDispatch();
  const { giftCards } = useSelector((state) => state.giftCard);
  const { cartTotalAmount } = useSelector((state) => state.giftCard);
  const user = JSON.parse(window.localStorage.getItem("usuario"));

  let templateCard = {
    id: user._id,
    image: "https://d2j6dbq0eux0bg.cloudfront.net/default-store/giftcards/gift_card_003_1500px.jpg",
    cardName: "",
    name: "Gift Card",
    price: 0,
    desc: "Give this card to a friend to buy the books he wants.",
    cartQuantity: 1,
    userId: user._id,
  };

  const handleResQuantity = (props) => {
    dispatch(resQuantity(props));
    dispatch(getTotalItems());
  };

  const handleSumQuantity = (props) => {
    dispatch(sumQuantity(props));
    dispatch(getTotalItems());
  };

  const handleBuy = (values) => {
    dispatch(
      addGiftCard({
        ...templateCard,
        cardName: values.name,
        price: values.price,
      })
    );
    dispatch(getTotalItems());
  };

  const handleRemove = (payload) => {
    dispatch(removeGiftCards(payload));
    dispatch(getTotalItems());
  };

  return (
    <div>
      <section>
        <div className={s.cardContainer}>
          <AiFillGift className={s.icon} />
          <div className={s.infoContainer}>
            <span>Gift Card</span>
            <h3>$ 10</h3>
            <button
              onClick={() =>
                handleBuy({
                  name: "Gift Card 10",
                  price: 10,
                })
              }
            >
              Buy
            </button>
          </div>
        </div>

        <div className={s.cardContainer}>
          <AiFillGift className={s.icon} />
          <div className={s.infoContainer}>
            <span>Gift Card</span>
            <h3>$ 40</h3>
            <button
              onClick={() =>
                handleBuy({
                  name: "Gift Card 40",
                  price: 40,
                })
              }
            >
              Buy
            </button>
          </div>
        </div>

        <div className={s.cardContainer}>
          <AiFillGift className={s.icon} />
          <div className={s.infoContainer}>
            <span>Gift Card</span>
            <h3>$ 100</h3>
            <button
              onClick={() =>
                handleBuy({
                  name: "Gift Card 100",
                  price: 100,
                })
              }
            >
              Buy
            </button>
          </div>
        </div>
      </section>

      {giftCards.length
        ? giftCards.map((card) => (
            <div className={s.checkout}>
              <ul className={s.titles}>
                <li>Card</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>

              <div className={s.cardContainer}>
                <picture>
                  <img src={card.image} alt={card.cardName} />
                </picture>
                <div className={s.cardDescription}>
                  <h3>{card.cardName}</h3>
                  <p>{card.desc}</p>
                </div>
                <span className={s.price}>${card.price}</span>

                <div className={s.counter}>
                  <button
                    onClick={() =>
                      handleResQuantity({
                        cardName: card.cardName,
                        quantity: card.cartQuantity - 1,
                      })
                    }
                  >
                    -
                  </button>
                  <span>{card.cartQuantity}</span>
                  <button
                    onClick={() =>
                      handleSumQuantity({
                        cardName: card.cardName,
                        quantity: card.cartQuantity + 1,
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <span className={s.subtotal}>
                  {card.cartQuantity * card.price}
                </span>
                <span className={s.removeCard}>
                  <BsFillXCircleFill
                    onClick={() => handleRemove(card.cardName)}
                  />
                </span>
              </div>
            </div>
          ))
        : null}

      {giftCards.length ? (
        <div className={s.total}>
          <div className={s.sum}>
            <h2>Total:</h2>
            <span>$ {cartTotalAmount}</span>
          </div>
          <Checkout cartItems={giftCards}/>
        </div>
      ) : null}
    </div>
  );
};

export default Cards;
