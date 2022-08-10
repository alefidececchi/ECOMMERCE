import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './forgot.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const Forgot = () => {

    const [send, setSend] = useState(false);

    const dispatcher = useDispatch()

    let navigate = useNavigate()

    console.log(send)
    console.log(Field)

    return (
        <div className={s.container}>


            
            <div className={s.formulario}>
                <section>
                    <Formik
                        initialValues={{

                            email: "",



                        }}
                        validate={(values) => {
                            let errors = {};

                            //validacion email 
                            if (!values.email) {
                                errors.email = 'Please write your Email'
                            } else if (values.email.length < 4 || values.email.length > 40) {
                                errors.email = 'Must be a valid email'
                            }

                            return errors;
                        }}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)

                            resetForm();
                            axios.put('/auth/forgot-password', values)
                            swal({
                                title: '',
                                text: 'Please check your inbox ',
                                icon: 'info',
                                button: 'OK'
                            }).then(res => {
                                if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                    dispatcher(fetchAllBooks());
                                    navigate('/reset-password')
                                }
                            })

                            resetForm();
                            // setSend(true)
                            // setTimeout(() => setSend(false), 3000)
                            console.log(values)



                        }}
                    >
                        
                        {({ errors }) => (
                            <Form className={s.form}>

                                <h3>Password recovery</h3>
                                <h4>Inform the email address used</h4>
                                <h4>   to create your account</h4>

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
                                    <button type="submit">  Submit </button>
                                    {send && <p>User added succecsfully</p>}


                                </div>

                                <Link to={"/login"}>

                                    <a > Back to log in </a>

                                </Link>

                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>


    );
};

export default Forgot;
