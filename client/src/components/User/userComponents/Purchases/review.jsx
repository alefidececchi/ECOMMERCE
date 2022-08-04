import '../../../../assets/sass/variables.scss';
import { useState } from "react";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import {useNavigate} from "react-router-dom";
import style from './review.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { fetchAllBooks, fetchBooksGenres } from "../../Redux/thunks/booksThunks";
import axios from "axios";
import jwt_decode from "jwt-decode"
import swal from "sweetalert";
import {FaStar} from "react-icons/fa"

const  colors ={
    rosa: "#a03c3c",
    gris: "#9d4edd;"
}


function Review({editOff, libros, reloading}){

    //console.log(estado.selling_books)
    const [review, setReview] = useState(false);
    const[editMode, setEditMode] = useState(undefined)

    const stars  = [1,2,3,4,5]
    const[rating, setRating] = useState(null)
    const[hoverValue, setHoverValue] = useState(null)
    const[comment, setComment] = useState(null)

    let navigate  = useNavigate()
    const {genres}  = useSelector((state) => state.genres);
    const { books } = useSelector((state) => state.books);
    const dispatcher = useDispatch()
    let[ejemplo, setEjemplo] = useState([{ bookName:"Harry Potter", image:'default', price: 40.50, amount: 15, state:'Nuevesito prro'}, {    bookName:"El Señor de los Anillos", image:'default', price: 40.50, amount: 10, state:'Nuevesito prro'}])
    let info = jwt_decode(window.localStorage.token); 
    let id = info.id

    const handleClick = value =>{
        // setValue(value)
        // console.log(values)
    }
    const handleMouseOver  = value => {
        setHoverValue(value)
    }
    const handleMouseLeave  = value => {
        setHoverValue(undefined)
    }




    return(
        
 
    <div className={style.mainContainer}>
        <div className={style.header}>
            <p>Book Review</p>
        </div>
        <div className={style.body}>
            <div className={style.star}>
                
                {stars.map((index) =>{
                    return(
                        <FaStar
                        key={index}
                        className={
                        + ((index <= rating) ? 'in-rate' : '')
                        + ((index <= hoverValue) ? 'in-hover' : '')
                        }
                        color ={(hoverValue || rating) >= index ? '#9d4edd' : "#797979"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHoverValue(index) }
                        onMouseLeave={() => setHoverValue(null)}
                   
                        />
                    )
                })}
            </div>
                <div>
                <Formik
                        initialValues={{
                            book:'',
                            score: rating, 
                            comment:'',
                        }}
                        validate={(values) =>{
                            let errors ={};
                            //validacion nombre del libro   
                            if(!values.name){
                                errors.name = 'Please select the book name'
                            }else if(values.name === 'BookName'){
                                errors.name = 'Please select the book name'
                            }
                            //validacion estrellas  
                            if(!values.star === null){
                                errors.star = 'Please select the book name'
                            }
                            //validacion comentario                                
                            if(!values.comment){
                                errors.comment = 'Please write a  description of the book'
                            }else if(values.comment.length > 350){
                                errors.comment = 'Description must have 250 characters'
                            }            
                            return errors;
                        }}
                        onSubmit={(values, {resetForm})=>{
                            let filtrado = books.find(b => b.name === values.name)
                            console.log(filtrado._id)
                            
                            console.log(values.score=rating)
                            console.log(values.name)
                            if(values.score === null){
                                swal({
                                    title:'Fail',
                                    text:'Select a score',
                                    icon:'error',
                                    button:'OK'
                                  }).then(res => {
                                    if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                        
                                        
                                    }
                                  })
                            }else{
                                swal({
                                    title:'Congratulation',
                                    text:'Book updated successfully',
                                    icon:'success',
                                    button:'OK'
                                  }).then(res => {
                                    if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                        axios({
                                        method: 'put',
                                        url: `http://localhost:3001/books/${filtrado._id}/${id}`,
                                        data: {
                                            score : values.score,
                                            comment: values.comment                   
                                        }
                                    })
                                    
                                        navigate('/')
                                        
                                        
                                    }
                                  })
                            }
                            console.log(values)
        
                            // resetForm();
                            // reloading()
                            // editOff()
                            // setSend(true)
                            
                            
                        }}
                    >
                        {( {errors} )=>(
                            <Form className={style.form}> 
                            <h2>Post new book</h2>
                            <div>
                                <label htmlFor="name">Book Name: </label>
                                <Field
                                as='select'
                                id="name"
                                placeholder="Type a name..."
                                name="name"
                                >
                                <option value='BookName' selected> Book Name </option>  
                                {
                                    libros.map((arreglo) => {
                                        return arreglo.map((book, i) =>(
                                            <option value={book.name}>{book.name}</option>
                                        ))
                                    })                
                                }
                                </Field>
                                <ErrorMessage name="name" component={()=>(
                                    <div className={style.error}>{errors.name}</div>
                                )} />
                            </div>
                            <div>
                            <label htmlFor="amt">Comment: </label>
                            <Field
                                as='textarea'
                                id="amt"
                                placeholder=""
                                name="comment"
                            />
                            <ErrorMessage name="comment" component={()=>(
                                <div className={style.error}>{errors.comment}</div>
                            )} />
            
                        </div>
                            <div>
                                <button type="submit" className={style.buttonSave}>  Send </button>
                                <button onClick={() => editOff()} className={style.buttonCancel}>  Cancel </button>
                            </div>  
                        </Form>
                        )}
                    </Formik>
                </div>
            
        </div> 
    {/* <Formik
        initialValues={{
            star:'', 
            review:'',
        }}
        validate={(values) =>{
        
            return errors;
        }}
        onSubmit={(values, {resetForm})=>{
 
        }}
    >
        {( {errors} )=>(
            <Form className={style.form}> 
            <h2>Post new book</h2>
            <div>
                <label htmlFor="name">Book Name: </label>
                <Field
                as='select'
                id="name"
                placeholder="Type a name..."
                name="name"
                >
                <option value='BookName' selected> Book Name </option>  
            {/* {      
                estado.selling_books.map(genre=>{
                    
                    return (
                        <option value={genre.name}>{genre.name}</option>
                        )
                    })
                } */}
                {/* </Field>

                <ErrorMessage name="name" component={()=>(
                    <div className={style.error}>{errors.name}</div>
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
                <button type="submit" className={style.buttonSave}>  Save </button>
                <button onClick={() => editOff()} className={style.buttonCancel}>  Cancel </button>
                {/* {send && <p>Product added succecsfully</p>} */}
            {/* </div>   */}
        {/* </Form>
        )}
    </Formik> */} 
</div>
        
    )
}

export default Review;