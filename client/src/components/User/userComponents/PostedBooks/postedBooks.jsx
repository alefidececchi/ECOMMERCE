import React from 'react';
import axios from 'axios';
import SideBar from '../../sideBar';
import s from './postedBooks.module.scss'
import { useState } from 'react';

import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import EditBook from '../../../EditBooks/editBook';
import swal from 'sweetalert'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode"

import { useEffect } from 'react';
import { fetchUserById } from '../../../../Redux/thunks/usersThunks';
import { fetchAllBooks, fetchBooksById } from '../../../../Redux/thunks/booksThunks';

function PostedBooks(){

  //console.log(window.localStorage.usuario)
   
    const[editMode, setEditMode] = useState(false)
    const { userById } = useSelector((state) => state.users);
    //const { books } = useSelector((state) => state.books);
    const { bookById } = useSelector((state) => state.books);
    const dispatch = useDispatch()
    //let[book, setBooks] = useState([{ bookName:"Harry Potter", image:portada, price: 40.50, amount: 15, state:'Nuevesito prro'}, {    bookName:"El Señor de los Anillos", image:portada2, price: 40.50, amount: 10, state:'Nuevesito prro'}])
    const [book, setBooks] = useState([])
    //let books  = []

    let info = jwt_decode(window.localStorage.token);
    //console.log(userById.selling_books)
    let id = info.id
    //let[books, setBooks] = useState(selling)
    //console.log(books)
    let correo = window.localStorage.usuario
    let vendiendo = window.localStorage.usuario.name
    //console.log(prueba)
    //console.log(prueba.selling_books)
    console.log(book.selling_books)

    const sellingStorage = JSON.parse(window.localStorage.getItem('usuario'));
    //console.log(sellingStorage.selling_books[0])
    
    
    useEffect( () => {
        console.log('entro')
          // sellingStorage.selling_books.map(b => {
          //   dispatch(fetchBooksById(b))
          //   setPrueba(prueba => [...prueba, bookById])
          // })
          
          // dispatch(fetchUserById(id))
          // dispatch(fetchAllBooks())

          axios.get(`http://localhost:3001/users/${id}`)
          .then((response)=>{
            console.log(response)
            setBooks(response.data.userrrs)
          })       

          
          
          //llenarState()
      
    }, []);
    //console.log(prueba)
  //   let selling = userById.selling_books
  //   //console.log(selling)
    
  //   function llenarState (){
  //     sellingStorage.selling_books.map((bookId) =>{
  //       let guardado = books.find((b) => b._id === bookId)
  //       console.log(guardado)
  //       setPrueba(prueba => [...prueba, guardado])
  //       console.log(prueba)
       
  // })
  //   }


    function deleteBook(del){
        console.log(del)
        let filtrado = book.filter(b => b.bookName !== del.bookName)
        console.log(filtrado)
        swal({
          title:'Delete?',
          text:'Do you want to delete your post?',
          icon:'warning',
          buttons:['No', 'Yes'] 
        }).then(res => {
          if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
            if(filtrado){
              setBooks(book = filtrado)
              swal({text: 'Post  deleted successfully', icon: 'success'})
            }
          }
        })
    }

    function editOn(){


        setEditMode(true)
      }
    const editOff = () =>{
    setEditMode(false)
    }
    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.containerBooks}> {/* <div className={style.containerBooks}> */}
              {
                editMode?(
                  <div>
                    <EditBook editOff={editOff}/>
                  </div>
                ):
               <div>
{/* country[0].activities.length > 0 ? 
                    country[0].activities.map((c,i) => */}

                {book.selling_books > 0 ?
                book.selling_books.map((book , i) =>
                
                    <div key={i} className={s.books}>
                      
                      <div className={s.imagen}>
                        <img src={book.image} alt='bookImage'></img>
                      </div>
                      <div  className={s.text}>
                        <h1> {book.bookName}</h1>
                        <h3> Price:${book.price} USD</h3>
                      </div>
                      <div  className={s.text}>
                        <h1> Stock: {book.amount}</h1>
                      </div>
                      <div className={s.botones}>
                        <button  onClick={editOn} className={s.button}>Edit</button>  {/* <button className={style.button} onClick={editOn}>Edit</button> */}
                       
                    
                        <button onClick={()=>deleteBook(book)}  className={s.button}>Delete</button> {/* <button className={style.button} onClick={()=>deleteBook(book)}>Delete</button> */}
                        
                      </div>
                    </div>

                  ):
                  <div > {/* <div className={style.books}> */}
                    
                    <div >
                      <h2>Books for sale?</h2>
                    </div>
                  </div>}
                </div>
              }
              <div className={s.btncentro}> {/* <div className={style.info}> */}
              
                <Link to={'/user/newBook'}>
                  <button >Sell</button>  {/* <button className={style.button2}>Sell</button> */}
                 
                </Link>
              </div>

            </div>
        </div>
    )
  // axios.delete('http://localhost:3001/api/activities/delete/'+del)
    // .then(()=>{
    //     history.push('/countries')
    // })
    //}
}
export default PostedBooks;

//tenemos el onjeto delos libros vendidos en una variable
//mapear la variable de los libros
//por cada libro se hace un dispatch y q traiga el libro buscandolo por id
//esos libros q trae por ID deberia de guardarlos en un estado 
//imprimer usando ese estado 