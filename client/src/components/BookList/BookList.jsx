import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/card";
import s from "./BookList.module.scss"
import Pagination from "../Pagination/pagination";


const BookList = ({ books }) => {

    // const { books } = useSelector((state) => state.books);
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
                {currentBooks.map((book) => {
                    // <Link to={"/home/" + elm.id}>  
                    return <Card />

                    // return <Card name={book.name} key={book.name}/>
                    // </Link>

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