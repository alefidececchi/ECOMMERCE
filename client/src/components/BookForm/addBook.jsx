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
import jwt_decode from "jwt-decode"
import example from '../../assets/imgs/example.jpg'
import { BallTriangle } from "react-loader-spinner";


export const data = [
    {
        Component: BallTriangle,
        props: {
            color: "#B881FF",
        },
        name: "Ball Triangle",
    },
  ];


function AddBook(){

    const [send, setSend] = useState(false);
    const {genres}  = useSelector((state) => state.genres);
    
    const dispatcher = useDispatch()

    let navigate = useNavigate()  

    let info = jwt_decode(window.localStorage.token); 
    console.log(info)
    let id = info.id

    let imgC =''
    useEffect(() => {
        if (genres.length === 0) {
            dispatcher(fetchBooksGenres());
        }
        console.log(genres)

      }, [dispatcher, genres]);

    // const onInputchange = (files) => {
    //     console.log(files)
    //     console.log(files[0])
    //   const formData = new FormData()
    //   formData.append("file", files[0])
    //   formData.append("upload_preset", "u2eqih7r")
    //   axios.post("https://api.cloudinary.com/v1_1/dbikbhgwc/image/upload", formData)
    //   .then((response) => {
    //     console.log(response)
    //     console.log(response.data.url)
    //     imgC = response.data.url

        
    //   }) 
    // }
    // console.log(imgC)

    return (
        <div className={style.container}>
            { genres ?  
        <div className={style.formulario}>
            <section>
                <Formik 
                    initialValues={{
                        name:"", 
                        authors:"",
                        image: '', 
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

                        //validacion nombre del author   
                        if(!values.authors){
                            errors.authors = 'Please write the author name'
                        }else if(values.authors.length < 4 || values.name.length > 40){
                            errors.authors = 'Author name must have between 4 or 20 characters'
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
                            errors.image = 'Please enter the book image'
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
                        console.log(values.file)
                        
                        
                        // console.log(imgC)
                        // console.log(values.file)

                        if(values.used === 'true'){
                            values.used = true
                        }else if(values.used === 'false'){
                            values.used = false
                        }
                        resetForm();
                        axios.post(`http://localhost:3001/books/${id}`, values)
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
                    {( {errors , setFieldValue, values} )=>(
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
                            <label htmlFor="name">Author: </label>
                            <Field
                            type='text'
                            id="authors"
                            placeholder="Type a name..."
                            name="authors"
                            />
                            <ErrorMessage name="authors" component={()=>(
                                <div className={style.error}>{errors.authors}</div>
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
                           
                        
                                <>
                                <img src={values.image}  
                                onerror="this.src='../../assets/imgs/example.jpg';" className={style.portada}></img>
                                <Field
                                type="file"
                                id="image"
                                value =""
                                name="image"
                                // onChange ={(event) => setFieldValue("file", event.target.files[0])}
                                onChange ={(event) => {
                                    const formData = new FormData()
                                    // console.log(event)
                                    // console.log(event.target.files[0])
                                    formData.append("file", event.target.files[0])
                                    formData.append("upload_preset", "u2eqih7r")
                                    //console.log(formData)
                                    axios.post("https://api.cloudinary.com/v1_1/dbikbhgwc/image/upload", formData)
                                    .then((response) => {
                                    setFieldValue("image", response.data.url)
                                    // console.log(response)
                                    // console.log(response.data.url)
                                    }) 
                                     
                                }}
                            />
                            <ErrorMessage name="image" component={()=>(
                                <div className={style.error}>{errors.image}</div>
                            )} />
                            </>
                                
                

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
        </div>:
        <div>
              {data.map((loader, index) => (
                  <div className={style.loading} data-tip={loader.name}>
                      <loader.Component {...loader.props} />
                  </div>
              ))}
        
          </div>
          }
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