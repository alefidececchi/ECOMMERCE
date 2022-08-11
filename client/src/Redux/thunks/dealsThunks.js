import axios from "axios";
import { getBooks } from "../slices/dealsSlice";

const fetchAllDeals = () => (dispatch) => {
  axios
    .get(`/books/offers`)
    .then((response) => dispatch(getBooks(response.data.prueba)))
    .catch((error) => console.log(error));
};


export { fetchAllDeals }
