import axios from 'axios';
import { loadUser } from '../slices/wishListSlice';

const fetchUserById = (id) => (dispatch) => {
  axios.get(`/users/${id}`)
  .then(response => dispatch(loadUser(response.data.userrrs)))
  .catch(error => console.log(error));
}


const fetchUpdateWishList = ({id, wishList}) => (dispatch) => {
  axios.put(`/users/update/wishlist/${id}`, wishList)
  .catch(error => console.log(error))
}


export {fetchUserById, fetchUpdateWishList}