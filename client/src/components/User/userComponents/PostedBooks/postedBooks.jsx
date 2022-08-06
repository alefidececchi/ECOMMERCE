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

function PostedBooks(){

  //console.log(window.localStorage.usuario)
   
    const[editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    const [book, setBooks] = useState()
    //let books  = []

    
    //console.log(userById.selling_books)
  
    //let[books, setBooks] = useState(selling)
    //console.log(book)
    let correo = window.localStorage.usuario
    let vendiendo = window.localStorage.usuario.name
    //console.log(prueba)
    //console.log(prueba.selling_books)
    //console.log(book.selling_books)
    const[reload, setReload] = useState(false)
    const sellingStorage = JSON.parse(window.localStorage.getItem('usuario'));
    //console.log(sellingStorage.selling_books[0])
    let info = jwt_decode(window.localStorage.token);
    //console.log(userById.selling_books)
    let id = info.id
    
    
    useEffect( () => {
        //console.log('entro')
   
          // sellingStorage.selling_books.map(b => {
          //   dispatch(fetchBooksById(b))
          //   setPrueba(prueba => [...prueba, bookById])
          // })
          
          // dispatch(fetchUserById(id))
          dispatch(fetchAllBooks())
          setReload(false)
          axios.get(`http://localhost:3001/users/${id}`)
          .then((response)=>{
            //console.log(response)
            setBooks(response.data.userrrs)
          })       
      
          
          
          //llenarState()
      
    }, [reload]);



    function deleteBook(del){
    
        console.log(del)
        let filtrado = book.selling_books.filter(b => b._id !== del)
        console.log(filtrado)
        swal({
          title:'Delete?',
          text:'Do you want to delete your post?',
          icon:'warning',
          buttons:['No', 'Yes'] 
        }).then(res => {
          if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
            if(filtrado){
              console.log('entro')
              axios.delete(`http://localhost:3001/books/${del}/${id}`)
              axios.delete(`http://localhost:3001/books/${del}`)
              .then(reloading())
              dispatch(fetchAllBooks())
              console.log('entro')
             
              //setBooks(filtrado)
              swal({text: 'Post  deleted successfully', icon: 'success'})
            }
          }
        })


    }
    function reloading(){
    
      if (reload){
  
          return setReload(false)
      }else{
        return setReload(true)
      }
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
           {book ?
           <>
            <div className={s.containerBooks}> {/* <div className={style.containerBooks}> */}
              {
                editMode?(
                  <div>
                    <EditBook editOff={editOff} estado={book} reloading ={reloading}/>
                  </div>
                ):
               <div>
{/* country[0].activities.length > 0 ? 
                    country[0].activities.map((c,i) => */}

                {book.selling_books.length > 0 ?
                book.selling_books.map((book , i) =>
                
                    <div key={i} className={s.books}>
                      
                      <div className={s.imagen}>
                        <img src={book.image} alt='bookImage'></img>
                      </div>
                      <div  className={s.text}>
                        <h1> {book.name}</h1>
                        <h3> Price:${book.price} USD</h3>
                      </div>
                      <div  className={s.text}>
                        <h1> Stock: {book.stock}</h1>
                      </div>
                      <div className={s.botones}>
                        <button  onClick={editOn} className={s.button}>Edit</button>  {/* <button className={style.button} onClick={editOn}>Edit</button> */}
                       
                    
                        <button onClick={()=>deleteBook(book._id)}  className={s.button}>Delete</button> {/* <button className={style.button} onClick={()=>deleteBook(book)}>Delete</button> */}
                        
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
            </> 
            :
            <div>
            {data.map((loader, index) => (
                <div className={s.loading} data-tip={loader.name}>
                    <loader.Component {...loader.props} />
                </div>
            ))}

        </div>
            }
        </div>
    )

}
export default PostedBooks;

