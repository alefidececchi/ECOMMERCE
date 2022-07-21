import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './user.module.scss'

import { useState } from 'react';
import EditBook from '../EditBooks/editBook';

import userLogo from '../../assets/imgs/user.png'
import portada from '../../assets/imgs/hp.jpg'

const User = () => {
  
  const[image, setImage] = useState(userLogo)
  const[editMode, setEditMode] = useState(false)
  //const[books, setBooks] = useState([{    bookName:"Harry Popote", image:"No disponible :V", price: 40.50, amount: 15, state:'Nuevesito prro'}])

  let books = false
  //  let books = [{    bookName:"Harry Popote", 
  //   image:"No disponible :V", 
  //   price: 40.50, 
  //   amount: 15, 
  //   state:'Nuevesito prro'},
  //   // {    bookName:"Harry Popote 2", 
    // image:"No disponible :V", 
    // price: 40.50, 
    // amount: 15, 
    // state:'Nuevesito prro'},
  //]




  function deleteBook(){
    console.log('Borrado')
    console.log(books)
    books = []
    console.log(books)

  }


  function onInputchange(e){
    console.log( e.target.value)
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url)
    setImage(url)
  }

  function editOn(){
    setEditMode(true)
  }

  const editOff = () =>{
    setEditMode(false)
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.containerProfile}>
        <img src={image} className={style.userPhoto} alt='userProfile'></img>
        <h2>Usuario Nombre</h2>
        <form encType='multipart/form-data'>
          <div className={style.addFile}>
            <p>Change profile image?</p>
            <input type='file' name='userimage' onChange={onInputchange}/>
          </div>
        </form>
        <div>
          <div>
            <span>E-mail</span>
          </div>
          <div>
            <span>correo@correo.com</span>
          </div>
        </div>
      </div>
      <div className={style.addBook}>
          { 
            editMode?(
              <div>
                <EditBook editOff={editOff}/>
              </div>
            ):
            books.length > 0 ?
            books.map((book , i) =>
              <div>
                  <div key={i}>
                    <h1> {book.bookName}</h1>
                    <img src={portada} alt='bookImage'></img>
                    <h3> Price:$ {book.price} USD</h3>
                    <h3> Amount: {book.amount}</h3>
                    <h3> State: {book.state}</h3>
                  </div>
                  <div>
                    <button className={style.button} onClick={editOn}>Edit</button>
                  </div>
                  <div>
                    <button className={style.button} onClick={deleteBook}>Delete</button>
                  </div>
              </div>
              
              ):
              <div>
                <h2>Hi!</h2>
                <h2>Do you want to sell a book?</h2>
                <Link to={'/user/newBook'}>
                  <button className={style.button}>Post a Book</button>
                </Link>
              </div>
          }
        </div>
    </div>
  );
}

export default User;