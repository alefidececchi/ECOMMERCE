import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./card.module.scss";
import BookDetail from "../BookDetail/bookDetail";
import { addToCart } from "../../Redux/slices/shoping.slice";
import { getWishList } from "../../Redux/slices/wishListSlice";

const Card = ({ name, price, image, id, book, priceWithDiscount, offer }) => {

  const dispatch = useDispatch();

  // esto es para deplegar el detlle de la tarjeta
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [cart, setCart] = useState([]);

  const handleClick = () => {
    setCart(["hola me agregaron al estado cart"]);
  };

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const handleWishList = (book) => {
    dispatch(getWishList(book))
  }

  return (
    <div className={s.containerCard}>
      <div>
        <button className={s.fav} onClick={() => handleWishList(book)}>
          <i class="fas fa-heart"></i>
        </button>
        {
          offer === true ?

            price > priceWithDiscount ?
              <button className={s.discount} >
                {Math.round(100 - (100 / (price / priceWithDiscount)))} %
              </button> : null
            : null
        }
      </div>
      <img
        onClick={handleToggle}
        src={image}
        alt="book"
        width="216px"
        height="216px"
      />
      <div className={s.cart}>
        <div className={s.info}>
          {
            priceWithDiscount === 0 ?
              <h3>$ {price}</h3> :
              <h3>$ {priceWithDiscount}</h3>
          }
          <h4>{name}</h4>
        </div>
        <figure onClick={() => handleAddToCart(book)} className={s.info2}>
          <button>
            <i class="fas fa-cart-plus fa-lg"></i>
          </button>
        </figure>
      </div>
      {toggle && <BookDetail id={id} />}
    </div>
  );
};

export default Card;
