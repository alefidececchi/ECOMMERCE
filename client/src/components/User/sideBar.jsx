import s from './sideBar.module.scss'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import{BsCardChecklist , BsFillGiftFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import userLogo from '../../assets/imgs/user.png'
import { useState } from 'react';
import { fetchUserById } from '../../Redux/thunks/usersThunks';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode"
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

function SideBar(){

    const[image, setImage] = useState(userLogo)
    
    const { userById } = useSelector((state) => state.users);
    let info = jwt_decode(window.localStorage.token);
    
    let id = info.id
    let navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
  
        dispatch(fetchUserById(id));
       
        
      
  }, []);

    const handleClick = () => {
      navigate("/")
      window.location.reload()
      localStorage.clear()
      
  
    }

    return(
    <div className={s.main}>
       
        <div  className={s.container}>

            <ul>
            { 
                userById.image ?
              userById.image === "default_image" ?
              <img src={image} className={s.userPhoto} alt={'imagen'} ></img>:
              <img src={userById.image} className={s.userPhoto} alt={userLogo} ></img>:              
            <div>
              {data.map((loader, index) => (
                  <div className={s.loading} data-tip={loader.name}>
                      <loader.Component {...loader.props} />
                  </div>
              ))}
        
          </div>
            }
                <li>
                    <Link to='/user'>User</Link>
                </li>
                <li>
                    <Link to='/user/myWishList'>My WhishList</Link>
                </li>
                {/* <li className={s.lista}>
                    <Link to="/user/myGiftCards">My GiftCards </Link>
                </li> */}
                <li>
                    <Link to="/user/sales" > Sales </Link>
                </li>
                <li> 
                    <Link to="/user/purchases">Purchases</Link>
                </li>
                <li>
                    <Link to="/user/discounts">Discounts</Link>
                </li>
                {/* <li>
                    <Link to="/user/payment">Payment</Link>
                </li> */}
                <li>
                    <Link to={'/'} onClick={handleClick}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
    )
}
export default SideBar