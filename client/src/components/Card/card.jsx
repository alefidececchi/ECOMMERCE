import React, { useState } from "react";
import s from "./card.module.scss"
import BookDetail from '../BookDetail/bookDetail';

const Card = ({ name, price, image ,id}) => {


    // esto es para deplegar el detlle de la tarjeta 
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }


    const [cart, setCart] = useState([]);

    const handleClick = () => {
        setCart(["hola me agregaron al estado cart"]);
    }

    console.log(cart)
    // console.log(name)

    return (


        <div className={s.containerCard} >
            <button className={s.fav}  >
                <i class="fas fa-heart"></i>
            </button>

            <img onClick={handleToggle} src={image} alt="book" width="216px" height="216px" />
            <div className={s.cart} >
                <div className={s.info}>

                    <h3>{price}</h3>
                    <h4 >{name}</h4>
                </div>
                <figure onClick={handleClick} className={s.info2}>
                    <button><i class="fas fa-cart-plus fa-lg"></i></button>

                </figure>
            </div>


            {toggle && <BookDetail id={id} />}


        </div>


    )
}

export default Card;
