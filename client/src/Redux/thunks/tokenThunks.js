
import axios from "axios";
import {
    getToken,

} from "../slices/tokenSlice";

const fetchToken = (values) => (dispatch) => {

    axios
        // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        .post("http://localhost:3001/auth/login", values)
        .then((response) => {

            dispatch(getToken(response.data.token));

        })
        .catch((error) => console.log(error));
};


export {
    fetchToken,

}

