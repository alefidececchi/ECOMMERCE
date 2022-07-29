
import axios from "axios";
import {
    getToken,

} from "../slices/tokenSlice";

const fetchToken = (values) => (dispatch) => {

    axios
        .post("http://localhost:3001/auth/login", values)
        .then((response) => {
            console.log(response)
            dispatch(getToken(response.data.token));

        })
        .catch((error) => console.log(error));
};


export {
    fetchToken,

}

