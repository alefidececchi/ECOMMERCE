import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import style from './addBook.module.scss'
import swal from 'sweetalert'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {
    fetchBooksGenres, fetchAllBooks
  } from "../../Redux/thunks/booksThunks";


function AddBook(){

    const [send, setSend] = useState(false);
    const {genres}  = useSelector((state) => state.genres);
    const dispatcher = useDispatch()

    let navigate = useNavigate()   


    useEffect(() => {
        if (genres.length === 0) {
            dispatcher(fetchBooksGenres());
        }
        console.log(genres)

      }, [dispatcher, genres]);


    return (
        <div className={style.container}>
        <div className={style.formulario}>
            <section>
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
                        console.log(values)
                        if(values.used === 'true'){
                            values.used = true
                        }else if(values.used === 'false'){
                            values.used = false
                        }
                        resetForm();
                        axios.post('http://localhost:3001/books/', values)
                        swal({
                            title:'Congratulation',
                            text:'Book published successfully',
                            icon:'success',
                            button:'OK'
                          }).then(res => {
                            if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                              dispatcher(fetchAllBooks());
                              navigate('/user')
                            }
                          })

                        resetForm();
                        // setSend(true)
                        // setTimeout(() => setSend(false), 3000)
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
                            id="nameBook"
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
                            <Field id="language"  name="language" as='select' className={style.select}>
                                <option value='Language' selected> Language </option>
                                <option value='en'> English </option>
                                <option value='es'> Spanish </option>    
                            </Field>                
                            <ErrorMessage name="language" component={()=>(
                                <div className={style.error}>{errors.language}</div>
                            )} />
                        </div>
                        <div>
                            <label>Secondhand </label>
                            <label>
                                <Field  type='radio' name="used" value='true'/> Yes
                            </label>
                            <label>
                                <Field  type='radio' name="used" value='false'/> No
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
                            <button type="submit">  Create </button>
                            {send && <p>Product added succecsfully</p>}
                        </div>  
                    </Form>
                    )}
                </Formik>
            </section>
        </div>
        </div>
        
    )
}


export default AddBook;






{/* <Formik
initialValues={{
    bookName:"", 
    image:"", 
    price:0, 
    amount:0, 
    state:''
}}
validate={(values) =>{
    let errors ={};
    //validacion nombre del libro
    if(!values.bookName){
        errors.bookName = 'Please write the book name'
    }
    // else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.bookName)){
    //     errors.bookName = 'Please write the book name' 
    // }
    //validacion imagen
    if(!values.image){
        errors.image = 'Please enter the book image link'
    }
    //validacion precio
    if(!values.price){
        errors.price = 'Please write the book price'
    }
    //validacion cantidad
    if(!values.amount){
        errors.amount = 'Please write the book amount for selling'
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
{( {values, errors, touched, handleSubmit, handleChange, handleBlur} )=>(
    <form onSubmit={handleSubmit} className={style.formulario}> 
    <h2>Post new book</h2>
    <div>
        <label htmlFor="name">Book Name: </label>
        <input
        type='text'
        id="name"
        placeholder="Type a name..."
        name="bookName"
        value={values.bookName}
        onChange={handleChange}
        onBlur={handleBlur}
        />
        {touched.bookName && errors.bookName && <div className={style.error}>{errors.bookName}</div>}
    </div>
    <div>
        <label htmlFor="img">Image: </label>
        <input
            type="text"
            id="img"
            placeholder="https://image-url-png"
            name="image"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        {touched.image && errors.image && <div className={style.error}>{errors.image}</div>}
    </div>
    <div>
        <label htmlFor="prc">Price: </label>
        <input
            type="number"
            id="prc"
            placeholder="$$$"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        {touched.price && errors.price && <div className={style.error}>{errors.price}</div>}
    </div>
    <div>
        <label htmlFor="amt">Amount: </label>
        <input
            type="number"
            id="amt"
            placeholder="5"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        {touched.amount && errors.amount && <div className={style.error}>{errors.amount}</div>}
    </div>
    <div>
        <label htmlFor="st">State: </label>
        <select name="state" id="st" value={values.state} onChange={handleChange}  onBlur={handleBlur}>
            <option selected="selected"> Select state </option>
            <option value={'New'}>New</option>
            <option value={'Used'}>Used</option>
        </select>
        {touched.state && errors.state && <div className={style.error}>{errors.state}</div>}
    </div>
    <div>
        <button type="submit">  Create </button>
        {send && <p>Product added succecsfully</p>}
    </div>  
</form>
)}
</Formik> */}



{/* <select onChange={saveCountry} name="Pais" className={inputs}>
<option selected disabled value=" ">Select Country</option>
    {

        countries.map(c=>{
            return (
                <option value={c.Nombre}>{c.Nombre}</option>
                )
            })
    }
</select> */}