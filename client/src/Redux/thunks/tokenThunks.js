
import axios from "axios";
import {
    getToken,
    getEmail

} from "../slices/tokenSlice";

const fetchToken = (values) => (dispatch) => {

    axios
        // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        .post("/auth/login", values)
        // .post('/users/registerGoogle')


        .then((response) => {
            // console.log(response)
            dispatch(getToken(response.data.token));

        })
        .catch((error) => console.log(error));
};
const fetchTokenGoogle = (values) => (dispatch) => {

    axios
        // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        .post('/users/registerGoogle', values)
        // .post('/users/registerGoogle')


        .then((response) => {
            console.log(response)
            dispatch(getToken(response.data.token));
           

        })
        .catch((error) => console.log(error));
};


export {
    fetchToken,fetchTokenGoogle,

}

