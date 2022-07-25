import { useState } from "react";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import {useNavigate} from "react-router-dom";
import style from './editBook.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, fetchBooksGenres } from "../../Redux/thunks/booksThunks";


function EditBook({editOff}){

    const [send, setSend] = useState(false);
    const[editMode, setEditMode] = useState(true)

    let navigate  = useNavigate()
    const {genres}  = useSelector((state) => state.genres);
    const dispatcher = useDispatch()
    useEffect(() => {
        if (genres.length === 0) {
            dispatcher(fetchBooksGenres());
        }
        console.log(genres)

      }, [dispatcher, genres]);


    return(
        <div>
 
                    <div className={style.mainContainer}>
                    <Formik
                        initialValues={{
                            name:"", 
                            image:"", 
                            price:'', 
                            stock:'',
                            released:'', 
                            genres:'',
                            language:'',
                            used:false,
                            description:''
                        }}
                        validate={(values) =>{
                            let errors ={};
                            //validacion nombre del libro   
                            if(!values.name){
                                errors.name = 'Please write the book name'
                            }else if(values.name.length < 4 || values.name.length > 40){
                                errors.name = 'Book name must have between 4 or 20 characters'
                            }

                            //validacion año publicacion
                            if(!values.released){
                                errors.released = 'Please write the released year of the book'
                            }else if(values.released < 0){
                                errors.released = 'The year must be possitive'
                            }
                        
                            //validacion genero
                            if(!values.genres){
                                errors.genres = 'Please select the genre of the book'
                            }else if(values.genres === 'Genre'){
                                errors.genres = 'Please select the genre of the book'
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
                            if(!values.stock){
                                errors.stock = 'Please write the book stock for selling'
                            }else if(values.stock < 0){
                                errors.stock = 'The stock must be possitive'
                            }
                            //validacion estado
                            if(!values.used){
                                errors.used = 'Please select the book state'
                            }
                            //validacion description
                            if(!values.description){
                                errors.description = 'Please write a  description of the book'
                            }else if(values.description.length > 350){
                                errors.description = 'Description must have 250 characters'
                        }
                            return errors;
                        }}
                        onSubmit={(values, {resetForm})=>{
                            if(values.used === 'true'){
                                values.used = true
                            }else if(values.used === 'false'){
                                values.used = false
                            }
                            resetForm();
                            setSend(true)
                            setTimeout(() => setSend(false), 3000)
                            console.log(values)
                        }}
                    >
                        {( {errors} )=>(
                            <Form className={style.form}> 
                            <h2>Post new book</h2>
                            <div>
                                <label htmlFor="name">Book Name: </label>
                                <Field
                                type='text'
                                id="name"
                                placeholder="Type a name..."
                                name="name"
                                />
                                <ErrorMessage name="name" component={()=>(
                                    <div className={style.error}>{errors.name}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="name">Released Year: </label>
                                <Field
                                type='number'
                                id="released"
                                placeholder="1996"
                                name="released"
                                />
                                <ErrorMessage name="released" component={()=>(
                                    <div className={style.error}>{errors.released}</div>
                                )} />
                            </div>
                            <div>
                            <label htmlFor="name">Genre: </label>
                            <Field id="genres"  name="genres" as='select' className={style.select}>
                            <option value='Genre' selected> Genre </option>  
                            {
                                genres.map(genre=>{
                                    return (
                                        <option value={genre}>{genre}</option>
                                        )
                                    })
                                }
                             </Field>    
                            <ErrorMessage name="genres" component={()=>(
                                <div className={style.error}>{errors.genres}</div>
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
                                    <div className={style.error}>{errors.image}</div>
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
                                    <div className={style.error}>{errors.price}</div>
                                )} />
                            </div>
                            <div>
                                <label htmlFor="amt">Stock: </label>
                                <Field
                                    type="number"
                                    id="amt"
                                    placeholder="15"
                                    name="stock"
                                />
                                <ErrorMessage name="stock" component={()=>(
                                    <div className={style.error}>{errors.stock}</div>
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
                                    <div className={style.error}>{errors.language}</div>
                                )} />
                            </div>
                            <div className={style.state} >
                                <label>Secondhand </label>
                                <label className={style.yesNo}>
                                    <Field  type='radio' name="used" value='true'className={style.circle} /> Yes
                                </label>
                                <label className={style.yesNo}>
                                    <Field  type='radio' name="used" value='false' className={style.circle} /> No
                                </label>
                                <ErrorMessage name="used" component={()=>(
                                    <div className={style.error}>{errors.used}</div>
                                )} />
                            </div>
                            <div>
                            <label htmlFor="amt">Description: </label>
                            <Field
                                as='textarea'
                                id="amt"
                                placeholder=""
                                name="description"
                            />
                            <ErrorMessage name="description" component={()=>(
                                <div className={style.error}>{errors.description}</div>
                            )} />
            
                        </div>
                            <div>
                                <button type="submit" className={style.buttonSave}>  Save </button>
                                <button onClick={() => editOff()} className={style.buttonCancel}>  Cancel </button>
                                {send && <p>Product added succecsfully</p>}
                            </div>  
                        </Form>
                        )}
                    </Formik>
                </div>
        </div>
    )
}

export default EditBook;