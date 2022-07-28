import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './activate.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate ,Link,useParams } from "react-router-dom";
import {
    fetchAllBooks
} from "../../Redux/thunks/booksThunks";




const Reset = (props) => {

    const [send, setSend] = useState(false);

    const dispatcher = useDispatch()

    let navigate = useNavigate()

    // console.log(send)
    // console.log(Field)

const { token } = useParams()


// useEffect(() => {
   
//     axios({
//         method: 'put',
//         url: 'http://localhost:3001/auth/forgot-password',
//         data: {
//            resetLink: token
//         },
//     });
// }, [])

// console.log(token)




    return (
        <div className={s.container}>
            <div className={s.formulario}>
                <section>
                    <Formik
                        initialValues={{
                            
                            newPass: "",
                            resetLink:token

                        }}
                        validate={(values) => {
                            let errors = {};
                        
                            //validacion password
                            if (!values.newPass) {
                                errors.newPass = 'Please write your password'
                            } else if (values.newPass.length < 4 || values.newPass.length > 40) {
                                errors.newPass = 'Password must have between 4 or 20 characters'
                            }
                            return errors;
                        }}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)

                            resetForm();
                            axios.put('http://localhost:3001/auth/reset-password', values)
                            swal({
                                title: 'Congratulation',
                                text: 'cmbiaste tu contraseña',
                                icon: 'success',
                                button: 'OK'
                            }).then(res => {
                                if (res) {//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                    dispatcher(fetchAllBooks());
                                    navigate('/login')
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
                                    <label htmlFor="newPass">Password: </label>
                                    <Field
                                        type='password'
                                        id="password"
                                        placeholder="********"
                                        name="newPass"
                                    />
                                    <ErrorMessage name="newPass" component={() => (
                                        <div className={s.error}>{errors.newPass}</div>
                                    )} />
                                </div>

                                <div>
                                    <button type="submit">  Create </button>
                                    {send && <p>User added succecsfully</p>}
                                </div>



{/*                                 
                                <div>
                                    <Link to={"/login" }>

                                        <button type="submit">  login</button>

                                    </Link>

                                    {send && <p>User added succecsfully</p>}
                                </div> */}
                            </Form>
                        )}
                    </Formik>
                </section>
            </div>
        </div>


    );
};

export default Reset;
