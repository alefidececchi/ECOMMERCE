import Card from "../Card/card";
import s from "./BookList.module.scss"


const BookList = ({ books }) => {
    return (

        <div className={s.BookList}>

            {books.map((book) => {
                // <Link to={"/home/" + elm.id}>  
                return <Card />


                // </Link>

            })}
        </div>
    )
}

BookList.defaultProps = {
    books: Array(10).fill(""),
}
export default BookList