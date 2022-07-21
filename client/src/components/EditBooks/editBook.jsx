import { useState } from "react";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import {useNavigate} from "react-router-dom";
import style from './editBook.module.scss'


function EditBook({editOff}){

    const [send, setSend] = useState(false);
    const[editMode, setEditMode] = useState(true)
    
    let navigate  = useNavigate()




    return(
        <div>
 
                    <section>
                    <Formik
                        initialValues={{
                            bookName:"", 
                            image:"", 
                            price:'', 
                            amount:'', //cambiar a stock
                            published:'', 
                            genre:'',
                            language:'',
                            state:''
                        }}
                        validate={(values) =>{
                            let errors ={};
                            //validacion nombre del libro   
                            if(!values.bookName){
                                errors.bookName = 'Please write the book name'
                            }else if(values.bookName.length < 4 || values.bookName.length > 20){
                                errors.bookName = 'Book name must have between 4 or 20 characters'
                            }

                            //validacion año publicacion
                            if(!values.published){
                                errors.published = 'Please write the published year of the book'
                            }else if(values.published < 0){
                                errors.published = 'The year must be possitive'
                            }
                        
                            //validacion genero
                            if(!values.genre){
                                errors.genre = 'Please write the genre of the book'
                            }

                            //validacion language
                            if(!values.language){
                                errors.language = 'Please select the language of the book'
                            }else if(values.language === 'Language'){
                                errors.language = 'Please select the language of the book'
                            }

                            //validacion imagen
                            if(!values.image){
                                errors.image = 'Please enter the book image link'
                            }
                            else if (
                                !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(
                                    values.image //como agregar imagenes delcomputador restringiendo formatos jgp png jpeg
                                )
                            ) {
                                errors.image = "Please insert a valid URL";
                            }
                            //validacion precio  
                            if(!values.price){
                                errors.price = 'Please write the book price'
                            }else if(values.price < 0){
                                errors.price = 'The price must be possitive'
                            }

                            //validacion cantidad 
                            if(!values.amount){
                                errors.amount = 'Please write the book amount for selling'
                            }else if(values.amount < 0){
                                errors.amount = 'The amount must be possitive'
                            }
                            //validacion estado
                            if(!values.state){
                                errors.state = 'Please select the book state'
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
                            <Form> 
                            <h2>Post new book</h2>
                            <div>
                                <label htmlFor="name">Book Name: </label>
                                <Field
                                type='text'
                                id="name"
                                placeholder="Type a name..."
                                name="bookName"
                                />
                                <ErrorMessage name="bookName" component={()=>(
                                    <div>{errors.bookName}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="name">Published Year: </label>
                                <Field
                                type='number'
                                id="published"
                                placeholder="1996"
                                name="published"
                                />
                                <ErrorMessage name="published" component={()=>(
                                    <div>{errors.published}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="name">Genre: </label>
                                <Field
                                type='text'
                                id="genre"
                                placeholder="Terror..."
                                name="genre"
                                />
                                <ErrorMessage name="genre" component={()=>(
                                    <div>{errors.genre}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="img">Image: </label>
                                <Field
                                    type="text"
                                    id="img"
                                    placeholder="https://image-url-png"
                                    name="image"
                                />
                                <ErrorMessage name="image" component={()=>(
                                    <div >{errors.image}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="prc">Price: </label>
                                <Field
                                    type="number"
                                    id="prc"
                                    placeholder="$9.50"
                                    name="price"
                                />
                                <ErrorMessage name="price" component={()=>(
                                    <div>{errors.price}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="amt">Stock: </label>
                                <Field
                                    type="number"
                                    id="amt"
                                    placeholder="15"
                                    name="amount"
                                />
                                <ErrorMessage name="amount" component={()=>(
                                    <div>{errors.amount}</div>
                                )} />
                
                            </div>
                            <div>
                                <label htmlFor="name">Language: </label>
                                <Field id="language"  name="language" as='select'>
                                    <option value='Language' selected> Language </option>
                                    <option value='English'> English </option>
                                    <option value='Spanish'> Spanish </option>    
                                </Field>                
                                <ErrorMessage name="language" component={()=>(
                                    <div>{errors.language}</div>
                                )} />
                            </div>
                            <div>
                                <label>State </label>
                                <label>
                                    <Field  type='radio' name="state" value='New'/> New
                                </label>
                                <label>
                                    <Field  type='radio' name="state" value='Old'/> Secondhand
                                </label>
                                <ErrorMessage name="state" component={()=>(
                                    <div>{errors.state}</div>
                                )} />
                            </div>
                            <div>
                                <button type="submit">  Create </button>
                                {send && <p>Product added succecsfully</p>}
                            </div>  
                        </Form>
                        )}
                    </Formik>
                    <div>
                        <button onClick={() => editOff()}>  Cancel </button>
                    </div>  
                </section>
        </div>
    )
}

export default EditBook;