import React from 'react';

import style from './user.module.scss'
import {BsCameraFill} from "react-icons/bs";
import { useState } from 'react';

import userLogo from '../../assets/imgs/user.png'

import EditProfile from '../EditProfile/editProfile';
import swal from 'sweetalert'
import SideBar from './sideBar';

const User = () => {

  const[image, setImage] = useState(userLogo)
  
  const[editProfile, setEditProfile] = useState(false)
  

  function onInputchange(e){
    console.log( e.target.value)
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url)
    setImage(url)
  }

  function editProfileOn(){
    setEditProfile(true)
  }

  const editProdileOff = () =>{
    setEditProfile(false)
  }

  return (
    <div className={style.container}>
      
      <div className={style.containerSide}>
        <SideBar/>
      </div>

      <div className={style.containerProfile}>
          
            <div>
              <h2>Account Details</h2>
            </div>
            <img src={image} className={style.userPhoto} alt='userProfile'></img>
            <div className={style.addFile}>
                <BsCameraFill className={style.icon}/>
                <input type='file' name='userimage' onChange={onInputchange}/>
            </div>
            

              {/* aca va la edicion */}
                
                  {editProfile?(
                      <div className={style.info}>
                        <EditProfile editProdileOff={editProdileOff}/>
                      </div>
                    ):
                    <div className={style.info}>
                      <div>
                        <h4>Name:</h4>
                      </div>
                      <div className={style.name}>
                        <h4>User Name</h4>
                      </div>
                      
                        <div>
                          <h4>E-mail:</h4>
                        </div>
                        <div className={style.name}>
                          <h4>correo@correo.com</h4>
                        </div>
                        <div>
                          <h4>Pasword:</h4>
                        </div>
                        <div className={style.name}>
                          <h4>xxxxxxx</h4>
                        </div>
                      
                      <div className={style.info}>
                        <div>
                          <h4>Address:</h4>
                        </div>
                        <div className={style.name}>
                          <h4>Calle Falsa 123</h4>
                        </div>
                      </div>
                    
                      <div>
                        <button onClick={editProfileOn} >Edit</button>
                      </div>
                    </div>
                  }
                
         
          
            {/* hasta aca */}
 
              {/* <Link to={'/user/newBook'}>
                <button className={style.button2}>Sell</button>
              </Link> */}

      </div>
        
    </div>

  );
}

export default User;