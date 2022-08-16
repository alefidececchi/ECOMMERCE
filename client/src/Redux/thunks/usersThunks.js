import axios from "axios";
import { getUsers, getUserById } from "../slices/userSlice";

const fetchAllUsers = () => (dispatch) => {
  axios
    .get("/users")
    .then((response) => {
      dispatch(getUsers(response.data.users));
    })
    .catch((error) => console.log(error));
};

const fetchUserById = (id) => (dispatch) => {
  //console.log(id)
  axios
    .get(`/users/${id}`)
    .then((response) => {
      //console.log(response.data)
      dispatch(getUserById(response.data.userrrs));
    })
    .catch((error) => console.log(error));
};

const fetchDeleteUser = (id) => (dispatch) => {
  axios
    .delete(`/users/${id}`)
    .then(dispatch(fetchAllUsers()))
    .catch((error) => console.log(error));
};

export { fetchAllUsers, fetchUserById, fetchDeleteUser };
