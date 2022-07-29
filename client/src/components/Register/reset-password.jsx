import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './resetPassword.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate, Link, useParams } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const ResetPassword = () => {





    return (
        <div className={s.container}>

            <h3>Email has been sent!</h3>
            <h4>Please check your inbox for instructions</h4>
            <h4>   on how to reset the password</h4>
            {/* <h4>You have 20 minutes to complete </h4>

            <h4>  the password change</h4> */}




        </div>


    );
};

export default ResetPassword;
