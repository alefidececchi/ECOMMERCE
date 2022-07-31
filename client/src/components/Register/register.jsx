import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './register.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const Register = () => {

    //  var google=""
    const google = window.google;


    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '7254200664-eqfkintn8s5ltn1i8c12finsmbkgkj6i.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();


    }, []);

    const [user, setUser] = useState({});
    //  console.log(user)

    function handleCallbackResponse(response) {
        //  console.log("Encoded JWT ID token: " + response.credential);
         //token response.credential
        var userObject = jwt_decode(response.credential);
        //  console.log(userObject);
        setUser(userObject);
        axios({
            method: 'post',
            url: 'http://localhost:3001/users/registerGoogle',
            data: {
                email: userObject.email,
                password: userObject.sub,
            },
        });

        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }


   
    // If we have no user: sign in button
    // If we have a user: show the log out button





    const [send, setSend] = useState(false);

    const dispatcher = useDispatch()

    let navigate = useNavigate()

    // console.log(send)
    // console.log(Field)

    return (
        <div className={s.container}>




            <div className={s.formulario}>
                <section>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",


                        }}
                        validate={(values) => {
                            let errors = {};
                            //validacion username 
                            if (!values.name) {
                                errors.name = 'Please write a Username'
                            } else if (values.name.length < 4 || values.name.length > 40) {
                                errors.name = 'Username must have between 4 or 20 characters'
                            }
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
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)

                            resetForm();
                            axios.post('http://localhost:3001/auth/register', values)
                            swal({
                                title: 'Congratulation',
                                text: 'Please check your inbox to activate your account',
                                icon: 'success',
                                button: 'OK'
                            }).then(res => {
                                if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                    dispatcher(fetchAllBooks());
                                    navigate('/activate')
                                }
                            })

                            resetForm();
                            // setSend(true)
                            // setTimeout(() => setSend(false), 3000)
                            // console.log(values)



                        }}
                    >
                        {({ errors }) => (
                            <Form className={s.form}>
                                <h3>My account</h3>
                                <div>
                                    <label htmlFor="name">Name </label>
                                    <Field
                                        type='text'
                                        id="nameBook"
                                        placeholder="Type a name..."
                                        name="name"
                                    />
                                    <ErrorMessage name="name" component={() => (
                                        <div className={s.error}>{errors.name}</div>
                                    )} />
                                </div>

                                <div>
                                    <label htmlFor="email">Email address </label>
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
                                    <label htmlFor="password">Password </label>
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
                                    <button type="submit">  Create </button>
                                    {send && <p>User added succecsfully</p>}
                                </div>




                                <div className={s.google} id="signInDiv"></div>

                                {Object.keys(user).length != 0 &&
                                    // <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                                    navigate('/')
                                }
                                {user &&
                                    <div>
                                        <img src={user.picture}></img>
                                        <h3>{user.name}</h3>
                                    </div>}


                            </Form>
                        )}
                    </Formik>
                </section>
            </div>








        </div>
    );
};

export default Register;
