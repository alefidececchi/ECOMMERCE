import s from "./deals.module.scss";
import React, { useEffect } from "react";
import Footer from "../Footer/footer";
import { fetchAllDeals } from "../../Redux/thunks/dealsThunks";
import { useSelector, useDispatch } from "react-redux";
import { BiHeartCircle } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

const Deals = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.deals);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchAllDeals());
    }
  }, [dispatch]);

  return (
    <div className={s.mainContainer}>
      <h1>Today´s Deals</h1>
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
              <BiHeartCircle className={s.icon} />
              <FaShoppingCart className={s.icon} />
            </div>
          </div>
        ))}
      </figure>
      <Footer />
    </div>
  );
};

export default Deals;
