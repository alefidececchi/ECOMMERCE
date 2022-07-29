
import axios from "axios";
import {
    getToken,
    getEmail

} from "../slices/tokenSlice";

const fetchToken = (values) => (dispatch) => {

    axios
        .post("http://localhost:3001/auth/login", values)
        .then((response) => {
            console.log(response)
            dispatch(getToken(response.data.token));
            dispatch(getEmail(response.data.email));

        })
        .catch((error) => console.log(error));
};


export {
    fetchToken,

}

