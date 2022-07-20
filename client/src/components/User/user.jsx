import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './user.module.scss'
import userLogo from '../../assets/imgs/user.png'
import { useState } from 'react';

const User = () => {
  
  const[image, setImage] = useState(userLogo)
  //const[books, setBooks] = useState([{    bookName:"Harry Popote", image:"No disponible :V", price: 40.50, amount: 15, state:'Nuevesito prro'}])

   let books = false
  //  let books = [{    bookName:"Harry Popote", 
  //   image:"No disponible :V", 
  //   price: 40.50, 
  //   amount: 15, 
  //   state:'Nuevesito prro'}]




  function deleteBook(book){
    console.log('Borrado')
  }


  function onInputchange(e){
    e.preventDefault()
    console.log( e.target.value)
    let url = URL.createObjectURL(e.target);

    setImage({
      ...image,
      [e.target.name]:  url
    })
  }

  return (
    <div>
      <div className={style.maincontainer}>
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
            books.length > 0 ?
            books.map((book , i) =>
              <div>
                  <div key={i}>
                    <h1> {book.bookName}</h1>
                    <img src={book.image} alt='bookImage'></img>
                    <h3> Price:$ {book.price} USD</h3>
                    <h3> Amount: {book.amount}</h3>
                    <h3> State: {book.state}</h3>
                  </div>
                  <div>
                    <button className={style.button}>Edit</button>
                  </div>
                  <div>
                    <button className={style.button} onClick={()=>deleteBook(book)}>X</button>
                  </div>
              </div>
              
              ):
              <div>
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
// bookName:"", 
// image:"", 
// price:'', 
// amount:'', 
// state:'