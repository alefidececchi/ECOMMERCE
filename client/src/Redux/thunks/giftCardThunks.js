import axios from 'axios';
import { loadUserOwner } from '../slices/giftCardSlice';

const fetchUserByEmail = (email) => (dispatch) => {
  axios.get(`/users?email=${email}`)
  .then(response => dispatch(loadUserOwner(response.data.users)))
  .catch(error => console.log(error));
}

const fetchSendCard = (props) => (dispatch) => {
  axios.put(`http://localhost:3001/users/purchasing-books/${props.id}`, props).catch(error => console.log(error));
}

export {fetchUserByEmail, fetchSendCard}