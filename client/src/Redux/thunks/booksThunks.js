
import axios from "axios";
import {
    getBooks,
} from "../slices/bookSlice";
import {
    getGenres,
} from "../slices/genreSlice";


const fetchAllBooks = () => (dispatch) => {
    axios
        .get("http://localhost:3001/books")
        .then((response) => {
            dispatch(getBooks(response.data));
        })
        .catch((error) => console.log(error));
};

const fetchBookByName = (name) => (dispatch) => {
    // axios
    //   .get(`/books/name?name=${name}`)
    //   .then((response) => dispatch(searchBook(response.data)))
    //   .catch((error) => console.log(error));
  };

const fetchBooksGenres = () => (dispatch) => {
axios
    .get("http://localhost:3001/books/genres")
    .then((response) => {
        
        dispatch(getGenres(response.data));
    })
    .catch((error) => console.log(error));
};



export {
    fetchAllBooks,
    fetchBookByName,
    fetchBooksGenres,
};