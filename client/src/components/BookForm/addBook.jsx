import { useState } from "react";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import style from './addBook.module.scss'


function AddBook(){

    const [send, setSend] = useState(false);

    return (
        <div className={style.formulario}>
            <section>
                <Formik 
                    initialValues={{
                        bookName:"", 
                        image:"", 
                        price:'', 
                        amount:'',
                        published:'', 
                        genre:'',
                        language:'',
                        state:'',
                        description:''
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
                        <Form > 
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
                                <div className={style.error}>{errors.bookName}</div>
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
                                <div className={style.error}>{errors.published}</div>
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
                                <div className={style.error}>{errors.genre}</div>
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
                                name="amount"
                            />
                            <ErrorMessage name="amount" component={()=>(
                                <div className={style.error}>{errors.amount}</div>
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
                        <div>
                            <label>State </label>
                            <label>
                                <Field  type='radio' name="state" value='New'/> New
                            </label>
                            <label>
                                <Field  type='radio' name="state" value='Old'/> Secondhand
                            </label>
                            <ErrorMessage name="state" component={()=>(
                                <div className={style.error}>{errors.state}</div>
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