import React from 'react';
import { Link} from 'react-router-dom';
import style from './user.module.scss'
import {BsCameraFill} from "react-icons/bs";
import { useState } from 'react';
import EditBook from '../EditBooks/editBook';
import userLogo from '../../assets/imgs/user.png'
import portada from '../../assets/imgs/hp.jpg'
import EditProfile from '../EditProfile/editProfile';

const User = () => {
  
  const[image, setImage] = useState(userLogo)
  const[editMode, setEditMode] = useState(false)
  const[editProfile, setEditProfile] = useState(false)
  //const[books, setBooks] = useState([{    bookName:"Harry Popote", image:"No disponible :V", price: 40.50, amount: 15, state:'Nuevesito prro'}])

  //let books = false
   let books = [{bookName:"Harry Popote", 
    image:"No disponible :V", 
    price: 40.50, 
    amount: 15, 
    state:'Nuevesito prro'},
    //  {bookName:"Harry Popote 2", 
    // image:"No disponible :V", 
    // price: 40.50, 
    // amount: 15, 
    // state:'Nuevesito prro'}
   ]



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

  function editProfileOn(){
    setEditProfile(true)
  }

  function editOn(){
    setEditMode(true)
  }

  const editOff = () =>{
    setEditMode(false)
  }
  const editProdileOff = () =>{
    setEditProfile(false)
  }

  return (
    <div className={style.containerProfile}>
      <img src={image} className={style.userPhoto} alt='userProfile'></img>
      <div>
        <div className={style.addFile}>
          <BsCameraFill className={style.icon}/>
          <input type='file' name='userimage' onChange={onInputchange}/>
        </div>
        {/* aca va la edicion */}
          <div>
            {editProfile?(
                <div>
                  <EditProfile editProdileOff={editProdileOff}/>
                </div>
              ):
              <div className={style.info}>
                <div>
                  <h2>Personal Info</h2>
                </div>
                <div>
                  <h4>Name: User Name</h4>
                </div>
                <div>
                  <h4>E-mail: correo@correo.com</h4>
                </div>
                <div>
                  <button onClick={editProfileOn}>Edit</button>
                </div>
              </div>
            }
          </div>
        {/* hasta aca */}
        <div>
          { 
            editMode?(
              <div>
                <EditBook editOff={editOff}/>
              </div>
            ):
            books.length > 0 ?
            books.map((book , i) =>
                <div key={i} className={style.containerBooks}>
                  <div>
                    <img src={portada} alt='bookImage'></img>
                  </div>
                  <div>
                    <h1> {book.bookName}</h1>
                    <h3> Price:$ {book.price} USD</h3>
                  </div>
                  <div>
                    <button className={style.button} onClick={editOn}>Edit</button>
                  </div>
                  <div>
                    <button className={style.button} onClick={deleteBook}>Delete</button>
                  </div>
                </div>
 
              ):
              <div className={style.books}>
                <div>
                  <h2>Books  for sale</h2>
                </div>
                <div>
                  <Link to={'/user/newBook'}>
                    <button className={style.button}>Post a Book</button>
                  </Link>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default User;

