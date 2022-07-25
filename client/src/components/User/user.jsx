import React from 'react';
import { Link} from 'react-router-dom';
import style from './user.module.scss'
import {BsCameraFill} from "react-icons/bs";
import { useState } from 'react';
import EditBook from '../EditBooks/editBook';
import userLogo from '../../assets/imgs/user.png'
import portada from '../../assets/imgs/hp.jpg'
import portada2 from '../../assets/imgs/LOTR.jpg'
import EditProfile from '../EditProfile/editProfile';
import swal from 'sweetalert'

const User = () => {

  const[image, setImage] = useState(userLogo)
  const[editMode, setEditMode] = useState(false)
  const[editProfile, setEditProfile] = useState(false)
  let[books, setBooks] = useState([{    bookName:"Harry Potter", image:portada, price: 40.50, amount: 15, state:'Nuevesito prro'}, {    bookName:"El Señor de los Anillos", image:portada2, price: 40.50, amount: 10, state:'Nuevesito prro'}])

  //let books = false
  //  let books = [{bookName:"Harry Popote",
  //   image:"No disponible :V",
  //   price: 40.50,
  //   amount: 15,
  //   state:'Nuevesito prro'},
  //    {bookName:"Harry Popote 2",
  //   image:"No disponible :V",
  //   price: 40.50,
  //   amount: 15,
  //   state:'Nuevesito prro'}
  //  ]

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

    
    // axios.delete('http://localhost:3001/api/activities/delete/'+del)
    // .then(()=>{
    //     history.push('/countries')
    // })
    //}

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
    <div className={style.container}>
      <div className={style.containerProfile}>
        <img src={image} className={style.userPhoto} alt='userProfile'></img>
        <div className={style.addFile}>
            <BsCameraFill className={style.icon}/>
            <input type='file' name='userimage' onChange={onInputchange}/>
        </div>
        <div>

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
                    <h4>Pasword: xxxxxxx</h4>
                  </div>
                  <div>
                    <button onClick={editProfileOn} className={style.button1}>Edit</button>
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
                      <img src={book.image} alt='bookImage'></img>
                    </div>
                    <div>
                      <h1> {book.bookName}</h1>
                      <h3> Price:${book.price} USD</h3>
                    </div>
                    <div>
                      <button className={style.button} onClick={editOn}>Edit</button>
                    </div>
                    <div>
                      <button className={style.button} onClick={()=>deleteBook(book)}>Delete</button>
                    </div>
                  </div>

                ):
                <div className={style.books}>
                  <div>
                    <h2>Books for sale?</h2>
                  </div>
                </div>

            }
            <div className={style.info}>
              <Link to={'/user/newBook'}>
                <button className={style.button2}>Sell</button>
              </Link>
            </div>
 
          </div>
            {/* <Link to={'/user/newBook'}>
              <button className={style.button2}>Sell</button>
            </Link> */}
        </div>
      </div>
    </div>

  );
}

export default User;

