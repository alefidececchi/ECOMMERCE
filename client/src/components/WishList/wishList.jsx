import React from "react";
import s from "./wish.module.scss";
import Footer from "../Footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCartFill, BsFillXCircleFill } from "react-icons/bs";
import { removeBook } from "../../Redux/slices/wishListSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);

  const handleDelete = (id) => {
    dispatch(removeBook(id));
  }

  return (
    <div className={s.mainContainer}>

      <section className={s.wishContainer}>
      <h1>My Wishlist</h1>
        {wishList.length ? (
          wishList.map((book) => (
            <figure>
              <img src={book.image} />
              <h3>{book.name}</h3>
              <span>${book.price}</span>
              <button>
                <BsFillCartFill className={s.icon}/>
              </button>
              <button onClick={() => handleDelete(book._id)}>
                <BsFillXCircleFill className={s.icon}/>
              </button>
            </figure>
          ))
        ) : (
          <h1>You haven’t added books to your wish list.</h1>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default WishList;
