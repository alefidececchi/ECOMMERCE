import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import {
    fetchBooksDetail,
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";
import { clearDetail } from "../../Redux/slices/bookSlice"
import { Link } from "react-router-dom"
import { getWishList } from "../../Redux/slices/wishListSlice";
import s from "./bookDetail.module.scss"

const BookDetail = (props, { book }) => {

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
    // console.log(booksDetail.reviews)


    let comment, score
    var reviews = booksDetail.reviews

    if (reviews) {
        comment = reviews.length == 0 ? null : reviews.length == 1 ? reviews[0].comment :
            reviews[0].comment + ", " + reviews[1].comment
        score = reviews.length == 0 ? null : reviews.length == 1 ? reviews[0].score : (reviews[0].score + reviews[1].score) / 2

    }
    // console.log(comment)



    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(!close);
        console.log("close")
    }


    const [cart, setCart] = useState([]);

    const handleClick = () => {
        setCart(["hola me agregaron al estado cart"]);
    }

    const handleWishList = (book) => {
        dispatch(getWishList(book))
    }




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

                                <button className={s.fav} onClick={() => handleWishList(book)}>
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button className={s.Close} onClick={handleClose} >
                                    <i class="fas fa-times fa-lg"></i>
                                </button>
                                <img src={booksDetail.image} alt="book" width="400px" height="400px" />
                                <div className={s.cart} >
                                    <div className={s.info}>
                                        <h3>$ {booksDetail.price}</h3>

                                        <h4 >{booksDetail.name}</h4>
                                        <div className={s.info2}>
                                            <h4 >Publication date: {booksDetail.released}</h4>
                                            <h4 >Author: {booksDetail.authors}</h4>
                                        </div>
                                        <div className={s.info2}>
                                            <h4 >Language: {booksDetail.language}</h4>
                                            <h4 >Genres: {booksDetail.genres}</h4>
                                        </div>


                                        <h4>{booksDetail.description}</h4>

                                        {comment !== null ?
                                            <div>
                                                <h4>Score: {score}</h4>
                                                <h4>Comment: {comment}</h4>
                                            </div>
                                            : null

                                        }


                                        <figure onClick={handleClick} >
                                            <button>
                                                <i class="fas fa-cart-plus fa-lg"></i>  <h3>Add to cart</h3>
                                            </button>
                                        </figure>
                                    </div>
                                </div>
                            </div>


                        </div>} </div>

            }
        </div>


    );
}

export default BookDetail;