import React, {useEffect} from "react";
import s from "./wish.module.scss";
import Footer from "../Footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCartFill, BsFillXCircleFill } from "react-icons/bs";
import { toast } from 'react-toastify'
import { removeBook, loadWishList } from "../../Redux/slices/wishListSlice";
import { addToCart } from "../../Redux/slices/shoping.slice";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);

  const handleDelete = (id) => {
    dispatch(removeBook(id));
    toast.success('Book removed from wish list.', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const handleCart = (book) => {
    dispatch(addToCart(book));
    dispatch(removeBook(book._id));
  }

  const wishListStorage = JSON.parse(window.localStorage.getItem('wishList'));

  useEffect(() => {
    if(wishList.length === 0){
      dispatch(loadWishList(wishListStorage))
    }
    
  }, []);
  return (
    <div className={s.mainContainer}>

      <section className={s.wishContainer}>
      <h1>My Wishlist</h1>
        {wishListStorage.length ? (
          wishListStorage.map((book) => (
            <figure key={book._id}>
              <img src={book.image} alt={book.name} />
              <h3>{book.name}</h3>
              <span>${book.price}</span>
              <button onClick={() => handleCart(book)}>
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
