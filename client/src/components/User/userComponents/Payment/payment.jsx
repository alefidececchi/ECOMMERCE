import React from 'react';
import SideBar from '../../sideBar';
import s from './payment.module.scss'

function Payment(){
    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.containerPay}>
                Payment
            </div>
        </div>
    )
}
export default Payment