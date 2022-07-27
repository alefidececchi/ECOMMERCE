import React from 'react';
import SideBar from '../../sideBar';
import s from './purchases.module.scss'

function Purchases(){
    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.containerPur}>
                Purchases
            </div>
        </div>
    )
}
export default Purchases