
import axios from "axios";
import {
    getUsers,

} from "../slices/userSlice";




const fetchAllUsers = () => (dispatch) => {
    axios
        .get("http://localhost:3001/users")
        .then((response) => {
            dispatch(getUsers(response.data.users));
        })
        .catch((error) => console.log(error));
};


export {
    fetchAllUsers,
   
}

