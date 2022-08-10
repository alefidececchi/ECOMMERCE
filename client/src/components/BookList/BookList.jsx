import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/card";
import s from "./BookList.module.scss"
import Pagination from "../Pagination/pagination";
import { BallTriangle } from "react-loader-spinner";

export const data = [
    {
        Component: BallTriangle,
        props: {
            color: "#B881FF",
        },
        name: "Ball Triangle",
    },
];
const BookList = ({ books }) => {

    const [currentPage, setcurrentPage] = useState(1);
    const [booksPerPage, setbooksPerPage] = useState(10);
    const lastIndex = currentPage * booksPerPage;
    const firstIndex = lastIndex - booksPerPage;
    const currentBooks = books.slice(firstIndex, lastIndex);

    if (currentPage > Math.ceil(books.length / booksPerPage) && currentPage !== 1) {
        setcurrentPage(1);
    }

    const changePage = (pageNumber) => {
        setcurrentPage(pageNumber);
    }

    return (
        <div>
            <div className={s.Pagination}>
                <Pagination
                    booksPerPage={booksPerPage}
                    books={books}
                    changePage={changePage}
                    currentPage={currentPage}
                /></div>
            <div className={s.BookList}>
                {currentBooks?.length === 0 && (
                    <div>
                        {data.map((loader, index) => (
                            <div className={s.loading} data-tip={loader.name}>
                                <loader.Component {...loader.props} />
                            </div>
                        ))}

                    </div>
                )}

                {currentBooks.map((book) => {
                    return <Card id={book._id} name={book.name} price={book.price} priceWithDiscount={book.priceWithDiscount} image={book.image} offer={book.inOffer} key={book._id} book={book} />

                })}
            </div>
            <div className={s.Pagination}>
                <Pagination
                    booksPerPage={booksPerPage}
                    books={books}
                    changePage={changePage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}
BookList.defaultProps = {
    books: Array(20).fill(""),
}
export default BookList