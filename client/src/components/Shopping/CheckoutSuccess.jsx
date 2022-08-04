import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode"
import { clearCart, getTotals } from "../../Redux/slices/shoping.slice";
import Footer from "../Footer/footer";
import s from './shopping.module.scss'

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart)

  let info = jwt_decode(window.localStorage.token); 
  let id = info.id
  console.log(cart)
  useEffect(() => {
    dispatch(getTotals());
  
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [cart, dispatch]);
  function next(){
      cart.cartItems.map(libro => {
        console.log('//////////////////////////////')
        // console.log(`http://localhost:3001/users/purchasing-books/${userInfo.id}`)
        // console.log(libro.cartQuantity)
        // console.log(libro.price)
        axios({
            method: 'put',
            url: `http://localhost:3001/users/${id}/${libro._id}`
        })
      })
      dispatch(clearCart());
  }

  return (
    
      <div className={s.cartContainer}>
        <h2>Checkout Successful</h2>
        <button onClick={next}>Continue</button>
        <Footer />
      </div>
      
    
  );
};

export default CheckoutSuccess;