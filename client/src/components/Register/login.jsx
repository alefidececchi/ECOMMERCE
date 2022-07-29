import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './login.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate, Link } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";

import {
    fetchAllUsers
} from "../../Redux/thunks/usersThunks";

import {
    fetchToken
} from "../../Redux/thunks/tokenThunks";

const Login = () => {

    // const [user, setUser] = useState({});

    // function handleCallbackResponse(response) {
    //     console.log("Encoded JWT ID token: " + response.credential);
    //     var userObject = jwt_decode(response.credential);
    //     console.log(userObject);
    //     setUser(userObject);
    //     document.getElementById("signInDiv").hidden = true;
    // }

    // function handleSignOut(event) {
    //     setUser({});
    //     document.getElementById("signInDiv").hidden = false;
    // }



    // useEffect(() => {
    //     google.accounts.id.initialize({
    //         client_id: '7254200664-eqfkintn8s5ltn1i8c12finsmbkgkj6i.apps.googleusercontent.com',
    //         callback: handleCallbackResponse
    //     });

    //     google.accounts.id.renderButton(
    //         document.getElementById('signInDiv'),
    //         { theme: "outline", size: "large" }
    //     );

    //     google.accounts.id.prompt();
    // }, []);
    // // If we have no user: sign in button
    // // If we have a user: show the log out button


    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);

    const { token } = useSelector((state) => state.token);
    const { email } = useSelector((state) => state.token);

     console.log(token)
     console.log(email)


    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, users]);

    // console.log(users)




    const [send, setSend] = useState(false);

    const dispatcher = useDispatch()

    let navigate = useNavigate()

    // console.log(send)
    // console.log(Field)

    return (
        <div className={s.container}>

            {/* <div id="signInDiv"></div>

            {Object.keys(user).length != 0 &&
                <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            }
            {user &&
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>} */}


            <div className={s.formulario}>
                <section>
                    <Formik
                        initialValues={{

                            email: "",
                            password: "",


                        }}
                        validate={(values) => {
                            let errors = {};
                            //validacion username 

                            //validacion email 
                            if (!values.email) {
                                errors.email = 'Please write your Email'
                            } else if (values.email.length < 4 || values.email.length > 40) {
                                errors.email = 'Must be a valid email'
                            }
                            //validacion password
                            if (!values.password) {
                                errors.password = 'Please write your password'
                            } else if (values.password.length < 4 || values.password.length > 40) {
                                errors.password = 'Password must have between 4 or 20 characters'
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            // console.log(values)

                            try {

                                // const data = await axios.post('http://localhost:3001/auth/login', values)

                                dispatcher(fetchToken(values))
                                // const token = data.data.token
                                // console.log(token)

                                // if (data) {
                                //     return swal({
                                //         title: 'Congratulation',
                                //         text: 'estas logeado',
                                //         icon: 'success',
                                //         button: 'OK'
                                //     })
                                //         .then(res => {
                                //             if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                //                 dispatcher(fetchAllBooks());
                                //                 navigate('/')
                                //             }
                                //         })
                                // }
                            } catch (err) {
                                resetForm();
                                return swal({
                                    title: 'nooo',
                                    text: 'estas logeado',
                                    icon: 'success',
                                    button: 'OK'
                                })
                                    .then(res => {
                                        if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                            dispatcher(fetchAllBooks());
                                            navigate('/login')
                                        }
                                    })
                            }
                        }

                            //     axios.post('http://localhost:3001/auth/login', values)

                            //     .then(res=>{console.log(res)})

                        }





                    >
                        {({ errors }) => (
                            <Form className={s.form}>

                                <div>
                                    <label htmlFor="email">Email address: </label>
                                    <Field
                                        type='text'
                                        id="email"
                                        placeholder="user@user.com"
                                        name="email"
                                    />
                                    <ErrorMessage name="email" component={() => (
                                        <div className={s.error}>{errors.email}</div>
                                    )} />
                                </div>

                                <div>
                                    <label htmlFor="password">Password: </label>
                                    <Field
                                        type='password'
                                        id="password"
                                        placeholder="********"
                                        name="password"
                                    />
                                    <ErrorMessage name="password" component={() => (
                                        <div className={s.error}>{errors.password}</div>
                                    )} />
                                </div>





                                <div>
                                    <button type="submit">Login </button>
                                    {send && <p>User added succecsfully</p>}

                                    <Link to={"/forgot-password"}>
                                        <a >  Forgot my password </a>
                                    </Link>
                                    <Link to={"/register"}>

                                        <button className={s.button2}>  Sign up </button>

                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </div >


    );
};

export default Login;
