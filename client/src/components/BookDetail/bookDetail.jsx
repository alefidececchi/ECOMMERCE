import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import {
    fetchBooksDetail,
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";
import { clearDetail } from "../../Redux/slices/bookSlice"
import { Link } from "react-router-dom"
import s from "./bookDetail.module.scss"

const BookDetail = (props) => {

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearDetail())
        dispatch(fetchBooksDetail(props.id))//id
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [dispatch])


    var { booksDetail } = useSelector((state) => state.books)
    // console.log(booksDetail.name)
    // console.log(props)


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



        <div>


            {!close &&

                <div className={s.shadow}>

                    {loading ? (
                        <div className={s.loading}>
                            <i class="fas fa-spinner fa-spin fa-3x "></i>

                        </div>
                    ) :
                        <div className={s.BookDetail}>



                            <div>
                                <button className={s.Close} onClick={handleClose} >
                                    <i class="fas fa-times fa-lg"></i>
                                </button>
                                <img src={booksDetail.image} alt="book" width="384px" height="384px" />
                                <div className={s.cart} >
                                    <div className={s.info}>
                                        <h3>$ {booksDetail.price}</h3>

                                        <h4 >{booksDetail.name}</h4>
                                        <h4 >{booksDetail.description}</h4>

                                        <figure onClick={handleClick} >
                                            <button>
                                                <i class="fas fa-cart-plus fa-lg"></i>  <h3>Add to cart</h3>
                                            </button>
                                        </figure>
                                    </div> </div></div>


                        </div>} </div>

            }
        </div>


    );
}

export default BookDetail;