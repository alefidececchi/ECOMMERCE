import React, { useReducer, useState, useEffect } from 'react';
import { TYPES } from '../../Redux/shoppingSlice/shopping.types';
import shoppingSlice, { initialState, ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, CLEAR_CART } from '../../Redux/shoppingSlice/shoping.slice'
import CartItem from './CartItem';
import ProductItem from './ProductItem';
import styles from './shopping.module.scss'
import NavBar from '../NavBar/navBar';
import Footer from '../Footer/footer';

const Shopping = () => {
  const [state, dispatch] = useReducer(shoppingSlice, initialState)
  const {products, cart} = state;
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  let items = 0
  let price = 0
  cart.map(item => {
    items+=item.quantity;
    price+= item.quantity * item.price
  })
    
  

  useEffect(() =>{
    console.log(cart)
    setTotalItems(items)
    setTotalPrice(price)
  }, [cart])

  const addToCart = (id) =>{
    
    dispatch({ type: ADD_TO_CART, payload: id })
  }

  const delFromCart = (id, all = false) =>{
    
    if(all){
      dispatch({type: REMOVE_ALL_FROM_CART, payload: id})
    }
    else{
      dispatch({type: REMOVE_ONE_FROM_CART, payload: id})
    }
  }

  const clearCart = () =>{
    dispatch({type: CLEAR_CART})
  }

  return (
    <div>
    <NavBar />
    <br />
    <br />
    <br />
    <br />
      
      <h3>Products</h3>
      <article className='box'>
      {products.map((product) => <ProductItem key={product.id} data={product} addToCart={addToCart}/>)}
      </article>
      
      <article className='box'>
        
        <h2 className={styles.title}>Your shopping cart</h2>
        <br />
        <div>
        {
          cart.map((item, index) => <CartItem key={item.index} data={item} delFromCart={delFromCart}/>)
        }
        </div>
      </article>
      <h1 className={styles.total}>Total items: {totalItems}</h1>
      <h1 className={styles.total}>Total: {totalPrice}$</h1>
      <button className={styles.boton}>Proceed to Checkout</button>
      <div className={styles.clearfix}></div>
      
      <button onClick={clearCart} className={styles.limpiar}>Clear cart</button>
      <Footer />
    </div>
  );
}

export default Shopping;
