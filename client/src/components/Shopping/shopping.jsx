import React, { useReducer } from 'react';
import { TYPES } from '../../Redux/store/actions/shoppingAction';
import { shoppingReducer, shoppingInitialState } from '../../Redux/store/reducers/shoppingReducer'
import CartItem from './CartItem';
import ProductItem from './productItem';

const Shopping = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
  const {products, cart} = state;

  console.log(cart)

  const addToCart = (id) =>{
    
    dispatch({ type: TYPES.ADD_TO_CART, payload: id })
  }

  const delFromCart = (id, all = false) =>{
    
    if(all){
      dispatch({type: TYPES.REMOVE_ALL_FROM_CART, payload: id})
    }
    else{
      dispatch({type: TYPES.REMOVE_ONE_FROM_CART, payload: id})
    }
  }

  const clearCart = () =>{
    dispatch({type: TYPES.CLEAR_CART})
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
        {
          cart.map((item, index) => <CartItem key={item.index} data={item} delFromCart={delFromCart}/>)
        }
      </article>
    </div>
  );
}

export default Shopping;
