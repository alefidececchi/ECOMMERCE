import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './activate.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate, Link, useParams } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const Activate = (props) => {

    const [send, setSend] = useState(false);

    const dispatcher = useDispatch()

    let navigate = useNavigate()

    // console.log(send)
    // console.log(Field)


    const { token } = useParams()


    useEffect(() => {
       
        axios({
            method: 'post',
            url: 'http://localhost:3001/auth/activate-account',
            data: {
                token: token
            },
        });
    }, [])

    console.log(token)

    return (
        <div className={s.container}>
            <h2>Email has been sent!</h2>
            <h4>Please check your inbox to activate your account</h4>
            <Link to={"/login"}>

                <button type="submit">Login</button>

            </Link>

        </div>


    );
};

export default Activate;
