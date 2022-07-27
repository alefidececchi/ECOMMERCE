//import s from './sideBar.module.scss'
import React from 'react';
import SideBar from '../../sideBar';
import s from './myGiftCards.module.scss'

function MyGiftCards(){
    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.containerGift}>
                MyGiftCards
            </div>
        </div>
    )
}
export default MyGiftCards
