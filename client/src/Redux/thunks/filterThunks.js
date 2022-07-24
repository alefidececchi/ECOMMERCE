import axios from "axios";
import { getGenres } from "../slices/bookSlice";
import { getFilters } from "../slices/bookSlice";

const fetchGenres = () => (dispatch) => {
  axios
    .get("http://localhost:3001/books/genres")
    .then((response) => dispatch(getGenres(response.data.genres)))
    .catch((error) => console.log(error));
};

const fetchFilteredBooks = (filters) => (dispatch) => {
  axios
    // .get('http://localhost:3001/books?genre=autobiography')
    .get(
      `http://localhost:3001/books?genre=${filters.genre ? filters.genre : ''}&status=${filters.status}&released=${filters.released ? filters.released : ''}&sort=${filters.sort ? filters.sort : ''}&price=${filters.price ? filters.price : ''}&language=${filters.language ? filters.language : ''}`
    )
    .then((response) => dispatch(getFilters(response.data.books)))
    .catch((error) => console.log(error));
};

export { fetchGenres, fetchFilteredBooks };
