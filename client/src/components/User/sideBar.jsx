import s from './sideBar.module.scss'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import{BsCardChecklist , BsFillGiftFill} from 'react-icons/bs'
function SideBar(){

    let navigate = useNavigate()
    const handleClick = () => {
      navigate("/")
      window.location.reload()
      localStorage.clear()
      
  
    }

    return(
    <div className={s.main}>
        {/* <div>
            <User></User>
        </div> */}
        <div  className={s.container}>
            <ul>
                <li>
                    <Link to='/user'>User</Link>
                </li>
                <li>
                    <Link to='/user/myWishList'>My WhishList</Link>
                </li>
                <li>
                    <Link to="/user/myGiftCards">My GiftCards</Link>
                </li>
                <li>
                    <Link to="/user/sales" > Sales </Link>
                </li>
                <li> 
                    <Link to="/user/purchases">Purchases</Link>
                </li>
                <li>
                    <Link to="/user/discounts">Discounts</Link>
                </li>
                <li>
                    <Link to="/user/payment">Payment</Link>
                </li>
                <li>
                    <Link to={'/'} onClick={handleClick}>Logout</Link>
                </li>
                {/* <Link to={'/'}>
                    <button   >logout</button>
                </Link> */}
            </ul>
        </div>
    </div>
    )
}
export default SideBar