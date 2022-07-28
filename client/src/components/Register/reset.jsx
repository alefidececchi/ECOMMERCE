import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './activate.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate ,Link } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const Reset = () => {

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
                            
                            password: "",


                        }}
                        validate={(values) => {
                            let errors = {};
                        
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
                                text: 'User created  successfully',
                                icon: 'success',
                                button: 'OK'
                            }).then(res => {
                                if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                    dispatcher(fetchAllBooks());
                                    navigate('/activate-account')
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
                                <h2>Email has been sent!</h2>
                                <h3>Please check your inbox for instructions on how to reset the password</h3>
                                <h4>You have 20 minutes to complete the password change</h4>
                               

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




                                <h3>o token</h3>
                                <div>
                                    <Link to={"/login" }>

                                        <button type="submit">  login</button>

                                    </Link>

                                    {send && <p>User added succecsfully</p>}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>


    );
};

export default Reset;
