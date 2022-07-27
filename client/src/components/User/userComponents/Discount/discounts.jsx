import React from 'react';
import SideBar from '../../sideBar';
import s from './discounts.module.scss'

function Discounts(){
    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.containerDis}>
                Discounts
            </div>
        </div>
    )
}
export default Discounts

