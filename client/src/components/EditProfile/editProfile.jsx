import { useState } from "react";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import {useNavigate} from "react-router-dom";
import style from './editProfile.module.scss'


function EditProfile({editProdileOff}){

    const [send, setSend] = useState(false);
   
    return(
        <div>
            <div className={style.mainContainer}>
                <Formik
                    initialValues={{
                        name:"", 
                        email:"",
                        password:"",
                        password2:"" 
                    }}
                    validate={(values) =>{
                        let errors ={};
                        //validacion nombre    
                        if(!values.name){
                            errors.name = 'Please write your name'
                        }else if(values.name.length < 4 || values.name.length > 40){
                            errors.name = 'Name must have between 4 or 20 characters'
                        }
                        //validacion nombre del password   
                        if(!values.password ){
                            errors.password = 'Please write your password'
                        }else if(values.password.length ===  0){
                            errors.password = 'Please write your password'
                        }
                        //validacion nombre del password2   
                        if(!values.password2){
                            errors.password2 = 'Please write your password'
                        }else if(values.password2 !== values.password){
                            errors.password2 = 'Passwords do not match'
                        }

                        //validacion correo
                        if(!values.email){
                            errors.email = 'Please write the e-mail address'
                        }else if(!/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/.test(values.email)){
                            errors.email = 'Write a correct e-mail address'
                        }
                
                        return errors;
                    }}
                    onSubmit={(values, {resetForm})=>{
                        resetForm();

                        console.log(values)
                    }}
                >
                    {( {errors} )=>(
                    <Form className={style.form}> 
                        <h2>Personal Information</h2>
                        <div>
                            <label htmlFor="name">Full Name: </label>
                            <Field
                            type='text'
                            id="name"
                            placeholder="Type a name..."
                            name="name"
                            />
                            <ErrorMessage name="name" component={()=>(
                                <div  className={style.error}>{errors.name}</div>
                            )} />
                        </div>
                        <div>
                            <label htmlFor="name">E-mail: </label>
                            <Field
                            type='email'
                            id="email"
                            placeholder="example@example.com"
                            name="email"
                            />
                            <ErrorMessage name="email" component={()=>(
                                <div className={style.error}>{errors.email}</div>
                            )} />
                        </div>
                        <div>
                            <label htmlFor="name">Password: </label>
                            <Field
                            type='password'
                            id="pass"
                            placeholder="Type new password"
                            name="password"
                            />
                            <ErrorMessage name="password" component={()=>(
                                <div  className={style.error}>{errors.password}</div>
                            )} />
                        </div>
                        <div>
                            <label htmlFor="name">Repeat Password: </label>
                            <Field
                            type='password'
                            id="pass2"
                            placeholder="Type new password again"
                            name="password2"
                            />
                            <ErrorMessage name="password2" component={()=>(
                                <div  className={style.error}>{errors.password2}</div>
                            )} />
                        </div>
                        <div>
                            <button type="submit" className={style.buttonSave}>  Save </button>
                            <button onClick={() => editProdileOff()} className={style.buttonCancel}>  Cancel </button>
                            {send && <p>Information updated succecsfully</p>}
                            
                        </div>  

                    </Form>
                    )}
                </Formik> 
            </div>
        </div>
    )
}

export default EditProfile;