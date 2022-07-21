
import axios from "axios";
import {
    getBooks,
    
} from "../slices/bookSlice";


const fetchAllBooks = () => (dispatch) => {
    // axios
    //     .get("/videogames")
    //     .then((response) => {
    //         dispatch(getVideogames(response.data));
    //     })
    //     .catch((error) => console.log(error));
};
const fetchBookByName = (name) => (dispatch) => {
    // axios
    //   .get(`/videogames/name?name=${name}`)
    //   .then((response) => dispatch(searchVideogame(response.data)))
    //   .catch((error) => console.log(error));
  };

export {
    fetchAllBooks,
    fetchBookByName,

};