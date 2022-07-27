import React from 'react';
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
            </div>
        </div>
    )
}
export default MyWishList