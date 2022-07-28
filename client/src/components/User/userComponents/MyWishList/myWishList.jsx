import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../sideBar';
import s from './myWishList.module.scss'

function MyWishList(){
    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.containerWish}>
                MyWishList
                <Link to={'/wish'}>
                    <button>WishList</button>
                </Link>
            </div>
        </div>
    )
}
export default MyWishList