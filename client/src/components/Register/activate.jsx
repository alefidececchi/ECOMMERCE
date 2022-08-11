import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import s from './activate.module.scss'
import axios from 'axios'
import { useNavigate, Link, useParams } from "react-router-dom";



const Activate = (props) => {

    const [send, setSend] = useState(false);

    const dispatcher = useDispatch()

    let navigate = useNavigate()

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
    return (
        <div className={s.container}>
            <h3>Verified account!</h3>
            <h4>Now you can login to your </h4>
            <h4>  account</h4>
            <Link to={"/login"}>
                <button type="submit">Login</button>
            </Link>
        </div>
    );
};

export default Activate;
