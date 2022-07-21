import React, { useState } from "react";
import s from "./bookDetail.module.scss"

const BookDetail = () => {


    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(!close);
        console.log("close")
    }


    const [cart, setCart] = useState([]);

    const handleClick = () => {
        setCart(["hola me agregaron al estado cart"]);
    }
    console.log(cart)


    return (

        <div className={s.BookDetail}>
            {!close &&
                <div>
                    <button className={s.Close} onClick={handleClose} >
                        <i class="fas fa-times fa-lg"></i>
                    </button>
                    <img src="https://img.freepik.com/free-psd/book-cover-mockup_125540-572.jpg?w=2000" alt="book" width="384px" height="384px" />
                    <div className={s.cart} >
                        <div className={s.info}>
                            <h3>$ 25.00</h3>
                            <h4 >the book volume 1</h4>
                            <h4 >Praesent posuere, ipsum vel volutpat sollicitudin, ante justo eleifend felis, a mattis nisi nulla et nunc. Donec sit amet lacinia mauris. consequat metus. </h4>

                            <figure onClick={handleClick} >
                                <button>
                                    <i class="fas fa-cart-plus fa-lg"></i>  <h3>Add to cart</h3>
                                </button>
                            </figure>
                        </div> </div></div>
            }


        </div>
    );
}

export default BookDetail;