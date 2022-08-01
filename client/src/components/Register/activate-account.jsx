import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './activateAccount.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate, Link, useParams } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const ActivateAccount = () => {

   
    return (
        <div className={s.container}>
            <h3>Email has been sent!</h3>
            <h4>Please check your inbox to activate your</h4>
            <h4>  account</h4>
         

        </div>


    );
};

export default ActivateAccount;
