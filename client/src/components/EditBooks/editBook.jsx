import { useState } from "react";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import {useNavigate} from "react-router-dom";
import style from './editBook.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, fetchBooksGenres } from "../../Redux/thunks/booksThunks";
import axios from "axios";
import jwt_decode from "jwt-decode"
import swal from "sweetalert";


function EditBook({editOff, estado, reloading}){

    console.log(estado.selling_books)
    const [send, setSend] = useState(false);
    const[editMode, setEditMode] = useState(true)


    let navigate  = useNavigate()
    const {genres}  = useSelector((state) => state.genres);
    const { books } = useSelector((state) => state.books);
    const dispatcher = useDispatch()

    let info = jwt_decode(window.localStorage.token); 
    let id = info.id
    useEffect(() => {
        
            dispatcher(fetchAllBooks());
        
        //console.log(genres)

      }, [dispatcher, genres]);


    return(
        <div>
 
                    <div className={style.mainContainer}>
                    <Formik
                        initialValues={{
                            price:'', 
                            stock:'',
                        }}
                        validate={(values) =>{
                            let errors ={};
                            //validacion nombre del libro   
                            if(!values.name){
                                errors.name = 'Please select the book name'
                            }else if(values.name === 'BookName'){
                                errors.name = 'Please select the book name'
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
                            return errors;
                        }}
                        onSubmit={(values, {resetForm})=>{
                            console.log('hola')
                            let filtrado = books.find(b => b.name === values.name)
                            console.log(filtrado._id)
                            
                            axios({
                                method: 'put',
                                url: `/books/${filtrado._id}`,
                                data: {
                                    price : values.price,
                                    stock: values.stock                   
                                }
                            })
                            // axios.put(`/books/${filtrado._id}` , values)
                            swal({
                                title:'Congratulation',
                                text:'Book updated successfully',
                                icon:'success',
                                button:'OK'
                              }).then(res => {
                                if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
                                    
                                    navigate('/user/sales')
                                }
                              })
                            resetForm();
                            reloading()
                            editOff()
                            setSend(true)
                            
                            console.log(values)
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
                                estado.selling_books.map(genre=>{
                                    
                                    return (
                                        <option value={genre.name}>{genre.name}</option>
                                        )
                                    })
                                }
                                </Field>

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