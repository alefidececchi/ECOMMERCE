import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../../../Redux/slices/shoping.slice';
import { loadWishList, removeBook } from '../../../../Redux/slices/wishListSlice';
import SideBar from '../../sideBar';
import s from './myWishList.module.scss'
import { BsFillCartFill, BsFillXCircleFill } from "react-icons/bs";
import Footer from '../../../Footer/footer';

function MyWishList(){

    

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
      if(wishListStorage){
        dispatch(loadWishList(wishListStorage))
      }
      
    }, []);
    return (
      <div className={s.mainContainer}>
             <div className={s.containerSide}>
            <SideBar/>
                </div>
  
        <section className={s.wishContainer}>
        <h1>My Wishlist</h1>
          {wishList.length > 0 ? (
            wishListStorage.map((book) => (
              <figure key={book._id}>
                <img src={book.image} />
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
  
      </div>
    );
  };
  
export default MyWishList