import axios from "axios";
import { getGenres } from "../slices/bookSlice";
import { getFilters } from "../slices/bookSlice";

const fetchGenres = () => (dispatch) => {
  axios
    .get("/books/genres")
    .then((response) => dispatch(getGenres(response.data.genres)))
    .catch((error) => console.log(error));
};

const fetchFilteredBooks = (filters) => (dispatch) => {
  axios
    // .get('/books?genre=autobiography')
    .get(
      `/books?genre=${filters.genre ? filters.genre : ''}&status=${filters.status}&released=${filters.released ? filters.released : ''}&sort=${filters.sort ? filters.sort : ''}&price=${filters.price ? filters.price : ''}&language=${filters.language ? filters.language : ''}`
    )
    .then((response) => dispatch(getFilters(response.data.books)))
    .catch((error) => console.log(error));
};

export { fetchGenres, fetchFilteredBooks };
