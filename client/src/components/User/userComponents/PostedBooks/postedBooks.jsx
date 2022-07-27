import React from 'react';
import SideBar from '../../sideBar';
import s from './postedBooks.module.scss'
import { useState } from 'react';

import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import EditBook from '../../../EditBooks/editBook';
import swal from 'sweetalert'
import { Link } from 'react-router-dom';

function PostedBooks(){

    const[editMode, setEditMode] = useState(false)
    let[books, setBooks] = useState([{ bookName:"Harry Potter", image:portada, price: 40.50, amount: 15, state:'Nuevesito prro'}, {    bookName:"El Señor de los Anillos", image:portada2, price: 40.50, amount: 10, state:'Nuevesito prro'}])
    
    function deleteBook(del){
        console.log(del)
        let filtrado = books.filter(b => b.bookName !== del.bookName)
        console.log(filtrado)
        swal({
          title:'Delete?',
          text:'Do you want to delete your post?',
          icon:'warning',
          buttons:['No', 'Yes'] 
        }).then(res => {
          if(res){//la condicional solo lleva la respuyesta ya que el segundo boton retorna un True por eso se posiciono el yes a la izquierda
            if(filtrado){
              setBooks(books = filtrado)
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
                books.length > 0 ?
                books.map((book , i) =>
                    <div key={i} className={s.books}>
                      <div className={s.imagen}>
                        <img src={book.image} alt='bookImage'></img>
                      </div>
                      <div  className={s.text}>
                        <h1> {book.bookName}</h1>
                        <h3> Price:${book.price} USD</h3>
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