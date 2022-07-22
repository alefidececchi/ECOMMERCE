import React, { useReducer, useState, useEffect } from 'react';
import { TYPES } from '../../Redux/shoppingSlice/shopping.types';
import shoppingSlice, { initialState, ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, CLEAR_CART } from '../../Redux/shoppingSlice/shoping.slice'
import CartItem from './CartItem';
import ProductItem from './productItem';
import styles from './shopping.module.scss'

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
    console.log(items)
  

  useEffect(() =>{
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
      <h2>Shopping cart</h2>
      <h3>Products</h3>
      <article className='box'>
      {products.map((product) => <ProductItem key={product.id} data={product} addToCart={addToCart}/>)}
      </article>
      <h3>Cart</h3>
      <article className='box'>
        <button onClick={clearCart}>Clear cart</button>
        <br />
        <div>
        {
          cart.map((item, index) => <CartItem key={item.index} data={item} delFromCart={delFromCart}/>)
        }
        </div>
      </article>
      <h1>Total items: {totalItems}</h1>
      <h1>Total: {totalPrice}$</h1>
      <button className={styles.boton}>Proceed to Checkout</button>
    </div>
  );
}

export default Shopping;
