import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './user.module.scss'
import { BsCameraFill } from "react-icons/bs";
import { useState } from 'react';

import userLogo from '../../assets/imgs/user.png'

import EditProfile from '../EditProfile/editProfile';
import Swal from 'sweetalert2'
import SideBar from './sideBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserById
} from "../../Redux/thunks/usersThunks";
import { useEffect } from 'react';
import jwt_decode from "jwt-decode"
import axios from 'axios';
// import Footer from '../Footer/footer';
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

const User = () => {

  const [image, setImage] = useState(userLogo)
  const [editProfile, setEditProfile] = useState(false)
  const [reload, setReload] = useState(false)
  const { userById } = useSelector((state) => state.users);

  const { email } = useSelector((state) => state.token);
  const dispatch = useDispatch()
  let correo = window.localStorage.email
  let filtrado = []
  let otro
  let info = jwt_decode(window.localStorage.token);
  //console.log(info)
  let id = info.id
  // console.log(id)
  // console.log(userById)
  let estado = userById

  let navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
    window.location.reload()
    localStorage.clear()


  }

  useEffect(() => {

    dispatch(fetchUserById(id));
    setReload(false)


  }, [reload]);


  const onInputchange = (files) => {
    // console.log(files.target.value)
    // let url = URL.createObjectURL(e.target.files[0]);
    // console.log(url)
    // setImage(url)

    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "u2eqih7r")
    axios.post("https://api.cloudinary.com/v1_1/dbikbhgwc/image/upload", formData)
      .then((response) => {
        console.log(response)
        console.log(response.data.url)
        axios({
          method: 'put',
          url: `/users/${id}`,
          data: {
            image: response.data.url,

          }
        })
        window.location.reload()
      })
  }

  function editProfileOn() {

    // dispatch(fetchUserById(id));
    setEditProfile(true)
  }

  const editProdileOff = () => {
    // dispatch(fetchUserById(id));
    setEditProfile(false)
  }

  function reloading() {

    if (reload) {
      // dispatch(fetchUserById(id));
      return setReload(false)
    } else {
      // dispatch(fetchUserById(id));
      return setReload(true)
    }
  }


  //  function userInfo(){
  //   console.log(correo)
  //   console.log(users)
  //   console.log(typeof(correo))
  //   if(users.length > 0){
  //     otro = users.filter(u => console.log(`"${u.email}"`))
  //     filtrado = users.filter(u => `"${u.email}"` === correo )
  //     console.log(filtrado)
  //     return filtrado
  //   }
  //  }
  const changePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Change PassWord?',
      html:
        '<input type ="password" id="swal-input1" class="swal2-input">' +
        '<input type ="password" id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        if (document.getElementById('swal-input1').value !== document.getElementById('swal-input2').value) {
          return 'the password must be the same'
        } else if (document.getElementById('swal-input1').value.length === 0 || document.getElementById('swal-input2').value.length === 0) {
          return 'Please write the new password'
        } else {
          axios.put(`/users/${id}`, { password: document.getElementById('swal-input1').value })
          return 'Password changed successfully'

        }
      }
    })

    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }

  return (

    <div>

      <div className={style.container}>

        <div className={style.containerSide}>
          <SideBar userById={userById} />
        </div>


        <div className={style.containerProfile}>

          <div>
            <h2>Account Details</h2>
          </div>
          {userById.image ?
            userById.image === "default_image" ?
              <img src={image} className={style.userPhoto} alt={'imagen'} ></img> :
              <img src={userById.image} className={style.userPhoto} alt={userLogo} ></img> :
            <div>
              {data.map((loader, index) => (
                <div className={style.loading} data-tip={loader.name}>
                  <loader.Component {...loader.props} />
                </div>
              ))}

            </div>
          }
          <div className={style.addFile}>
            <BsCameraFill className={style.icon} />
            <input type='file' name='userimage' onChange={(event) => onInputchange(event.target.files)} />
          </div>


          {/* aca va la edicion */}

          {editProfile ? (
            <div className={style.info}>
              <EditProfile
                reloading={reloading}
                editProdileOff={editProdileOff}
              />
            </div>
          ) :
            // users.length > 0 ?


            <div className={style.info}>
              <div>
                <h4>Name:</h4>
              </div>
              <div className={style.name}>
                <h4>{userById.name}</h4>
              </div>

              <div>
                <h4>E-mail:</h4>
              </div>
              <div className={style.name}>
                <h4>{userById.email}</h4>
              </div>
              {/* <div>
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
                      </div> */}

              <div className={style.btnedit}>
                <button onClick={editProfileOn} >Edit</button>
              </div>
              <div >
                <button onClick={changePassword} className={style.botonpass}>Change Password?</button>
              </div>
              <div className={style.info}>

              </div>
            </div>
          }



          {/* hasta aca */}

          {/* <Link to={'/user/newBook'}>
                <button className={style.button2}>Sell</button>
              </Link> */}

        </div>



      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default User;