import styles from './CartItem.module.scss'
import React, { useState } from 'react'

const CartItem = ({ data, delFromCart }) =>{

    let { id, name, price, quantity, image, description } = data

    const [input, setInput] = useState(quantity)
    return(
        <div className={styles.box}>
            <img
            className={styles.cartItem__image}
            src={image}
            alt={name}
            />
            <div className={styles.cartItem__details}>
            <h1 className={styles.details__title}>{name}</h1>
            <p className={styles.details__desc}>{description}</p>
            <h4 className={styles.details__title}>${price}.00 x {quantity} = ${price * quantity}.00</h4>
            </div>
            <button onClick={() => delFromCart(id)} className={styles.boton}>Delete one</button> <button onClick={() => delFromCart(id, true)} className={styles.boton}>Delete all</button>
            <br />
            
        </div>
    )
}

export default CartItem