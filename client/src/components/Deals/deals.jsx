import s from "./deals.module.scss";
import React, { useEffect } from "react";
import Footer from "../Footer/footer";
import { fetchAllDeals } from "../../Redux/thunks/dealsThunks";
import { getWishList } from "../../Redux/slices/wishListSlice";
import { addToCart } from "../../Redux/slices/shoping.slice";
import { useSelector, useDispatch } from "react-redux";
import { BiHeartCircle } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";

export const data = [
  {
    Component: BallTriangle,
    props: {
      color: "#B881FF",
      margin: '0 0',

    },
    name: "Ball Triangle",
  },
];

const Deals = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.deals);

  const handleWishList = (book) => {
    // console.log('sirvo');
    dispatch(getWishList(book));
  };

  const handleCart = (deal) => {
    dispatch(addToCart(deal));
  };

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchAllDeals());
    }
  }, [dispatch]);

  return (
    <div className={s.mainContainer}>
      <h1>Today´s Deals</h1>

      {books.length === 0 ? (
        <div>
          {data.map((loader, index) => (
            <div className={s.loading} data-tip={loader.name}>
              <loader.Component {...loader.props} className={s.loader}/>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <figure>
            {books.map((deal) => (
              <div className={s.card}>
                <img src={deal.image} alt={deal.name} />
                <h2>{deal.name}</h2>
                <div className={s.pricesContainer}>
                  <span>
                    <del className={s.normalPrice}>${deal.price}</del>
                  </span>
                  <span>${deal.priceWithDiscount}</span>
                </div>
                <div className={s.iconContainer}>
                  <BiHeartCircle
                    className={s.icon}
                    onClick={() => handleWishList(deal)}
                  />
                  <FaShoppingCart
                    className={s.icon}
                    onClick={() => handleCart(deal)}
                  />
                </div>
              </div>
            ))}
          </figure>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Deals;
