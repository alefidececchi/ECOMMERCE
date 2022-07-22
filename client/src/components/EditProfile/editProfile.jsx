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
                    }}
                    validate={(values) =>{
                        let errors ={};
                        //validacion nombre del libro   
                        if(!values.name){
                            errors.name = 'Please write your name'
                        }else if(values.name.length < 4 || values.name.length > 20){
                            errors.name = 'Name must have between 4 or 20 characters'
                        }

                        //validacion año publicacion
                        if(!values.email){
                            errors.email = 'Please write the e-mail address'
                        }else if(!/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/.test(values.email)){
                            errors.email = 'Write a correct e-mail address'
                        }
                
                        return errors;
                    }}
                    onSubmit={(values, {resetForm})=>{
                        resetForm();
                        setSend(true)
                        setTimeout(() => setSend(false), 3000)
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
                            <button type="submit" className={style.buttonSave}>  Save </button>
                            <button onClick={() => editProdileOff()} className={style.buttonCancel}>  Cancel </button>
                            {send && <p>Product added succecsfully</p>}
                            
                        </div>  

                    </Form>
                    )}
                </Formik> 
            </div>
        </div>
    )
}

export default EditProfile;