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

    if (reviews) { //una vez ya se hayan traido los datos renderizalos
        comment = reviews.length == 1 ? reviews[0].comment : reviews[0].comment + ", " + reviews[1].comment
        score = reviews.length == 1 ? reviews[0].score : (reviews[0].score + reviews[1].score) / 2

    }

    // console.log(comment)


    // var review = booksDetail.reviews
    //  const x = review.review[0]
    //    const x=review.find(elm=>elm[0].score)
    // console.log(review)
    // console.log(review.find(obj=>obj.comment))
    // var array = review[0].comment
    // console.log(array)

    // var reviews = booksDetail.reviews.map(elm => {
    //     return (
    //         elm.comment
    //     )

    // }).join(", ")
    // console.log(reviews)
    // let name
    // if (booksDetail[0]) { //una vez ya se hayan traido los datos renderizalos
    // name = booksDetail[0].name;}
    // img = detailDog[0].img;
    // temperament = detailDog[0].temperament
    // height = detailDog[0].height;
    // weight = detailDog[0].weight;
    // life_span = detailDog[0].life_span;




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


                                        <h4>Score: {score}</h4>
                                        <h4>Comment: {comment}</h4>

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