import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import style from './contactUs.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {
    fetchBooksGenres, fetchAllBooks
  } from "../../Redux/thunks/booksThunks";
import jwt_decode from "jwt-decode"
import example from '../../assets/imgs/example.jpg'
import { BallTriangle } from "react-loader-spinner";
import Footer from "../Footer/footer";


function ContactUs(){


    let info = jwt_decode(window.localStorage.token); 
    console.log(info)
    let id = info.id

   

    const initialState = {
        name: "",
        email: "",
        comment: "",
      };
    const [form, setForm] = useState(initialState);

    const [errors, setErrors] = useState({
    name: "",
    email: "",
    comment: "",

    });

    const validations = (input) => {
        const errorObject = {};
    
        if (!input.name) {
          errorObject.name = "The name field is empty";
        } else if (!/^[a-zA-Z ]*$/.test(input.name) || input.name.length < 3) {
          errorObject.name =
            "Your name must contain letters and more than 3 characters";
          console.log(errorObject);
        }
    
        if (!input.email) {
          errorObject.email = "The email field is empty";
        } else if (
            /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/.test(input.email) 
        ) {
          errorObject.email =
            "Email field must contain more than 20 characters";
        }
    
        if (!input.comment) {
            errorObject.comment = "The comment field is empty";
          } else if (!/^[a-zA-Z ]*$/.test(input.comment) || input.comment.length < 3) {
            errorObject.comment =
              "Your comment must contain letters and more than 3 characters";
            console.log(errorObject);
          }
    

        return errorObject;
      };

    const handleInputChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    }); 
    setErrors(
        validations({
          ...form,
          [e.target.name]: e.target.value,
        })
      );
    };

    return (
        <div className={style.container}>
            <div className={style.footer}>
        <section className={style.section}>
              <div className={style.formulario}>

                    <form action="https://formsubmit.co/24db36c4b7b8664f19823cadcfbceab3" method="POST">
                        <h2>CONTACT US</h2>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" onChange={handleInputChange} placeholder="Type your name..." required/>
                            {errors ? <span>{errors.name}</span> : null}
                        </div>
                        <div>
                            <label htmlFor="name">Your Email: </label>
                            <input type="email" name="email" onChange={handleInputChange} placeholder="email@example.com" required/>
                            {errors ? <span>{errors.email}</span> : null}
                        </div>
                        <div>
                            <label htmlFor="name">Description: </label>
                            <textarea name="comment" onChange={handleInputChange}/>
                            {errors ? <span>{errors.comment}</span> : null}
                        </div>
                        <input type="hidden" name="_next" value='http://localhost:3000' required/>
                        <input type="hidden" name="_captcha" value='false' required/>
                        <button type="submit">Send</button>
                    </form> 
            
                </div>

                 </section>
                 <Footer/>
             </div>
       
         </div>
    )

    
}


export default ContactUs;


  // // //     <Formik 
            // // //         initialValues={{
            // // //             email:"", 
            // // //             authors:"",
            // // //             description:''
            // // //         }}
            // // //         validate={(values) =>{
            // // //             let errors ={};
            // // //             //validacion nombre del libro   
            // // //             if(!values.email){
            // // //                 errors.email = 'Please write the book name'
            // // //             }
            // // //             // else if(values.email.length < 4 || values.email.length > 40){
            // // //             //     errors.email = 'Book name must have between 4 or 20 characters'
            // // //             // }

            // // //             //validacion nombre del author   
            // // //             if(!values.authors){

            // // //                 errors.authors = 'Please write the author name'
            // // //             }
            // // //             // else if(values.authors.length < 4 || values.name.length > 40){
            // // //             //     errors.authors = 'Author name must have between 4 or 20 characters'
            // // //             // }
            // // //             //validacion description
            // // //             if(!values.description){
            // // //                 errors.description = 'Please write a  description of the book'
            // // //             }else if(values.description.length > 350){
            // // //                 errors.description = 'Description must have 250 characters'
            // // //             }
            // // //             return errors;
            // // //         }}
            // // //         onSubmit={(values, {resetForm})=>{
            // // //             console.log(values)

            // // //             // resetForm();
                        
            // // //             axios.post("https://formsubmit.co/24db36c4b7b8664f19823cadcfbceab3", values)
            // // //             // swal({
            // // //             //     title:'Congratulation',
            // // //             //     text:'Book published successfully',
            // // //             //     icon:'success',
            // // //             //     button:'OK'
            // // //             //   }).then(res => {
            // // //             //     if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
            // // //             //       dispatcher(fetchAllBooks());
            // // //             //       navigate('/user')
            // // //             //     }
            // // //             //   })

            // // //             resetForm();
            // // //             // // setSend(true)
            // // //             // // setTimeout(() => setSend(false), 3000)
            // // //             // console.log(values)

                        
         
            // // //         }}
            // // //     >
            // // //         {( {errors , setFieldValue, values } )=>(
            // // //             <Form action="https://formsubmit.co/24db36c4b7b8664f19823cadcfbceab3" method="POST" className={style.form}> 
            // // //             <h2>CONTACT US</h2>
            // // //             <div>
            // // //                 <label htmlFor="name">Your Email: </label>
            // // //                 <Field
            // // //                 type='email'
            // // //                 id="nameBook"
            // // //                 placeholder="email@example.com"
            // // //                 name="email"
            // // //                 />
            // // //                 <ErrorMessage name="email" component={()=>(
            // // //                     <div className={style.error}>{errors.email}</div>
            // // //                 )} />
            // // //             </div>
            // // //             <div>
            // // //                 <label htmlFor="name">Suject: </label>
            // // //                 <Field
            // // //                 type='text'
            // // //                 id="authors"
            // // //                 placeholder="Type a name..."
            // // //                 name="authors"
            // // //                 />
            // // //                 <ErrorMessage name="authors" component={()=>(
            // // //                     <div className={style.error}>{errors.authors}</div>
            // // //                 )} />
            // // //             </div>
            // // //             <div>
            // // //                 <label htmlFor="amt">Description: </label>
            // // //                 <Field
            // // //                     as='textarea'
            // // //                     id="amt"
            // // //                     placeholder=""
            // // //                     name="description"
            // // //                 />
            // // //                 <ErrorMessage name="description" component={()=>(
            // // //                     <div className={style.error}>{errors.description}</div>
            // // //                 )} />
            
            // // //             </div>
            // // //             <div>
            // // //                 <button type="submit">  Create </button>
            // // //                 {send && <p>Product added succecsfully</p>}
            // // //             </div>  
            // // //         </Form>
            // // //         )}
            // // //     </Formik>
