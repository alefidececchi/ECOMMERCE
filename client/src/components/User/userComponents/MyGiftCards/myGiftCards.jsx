//import s from './sideBar.module.scss'
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../sideBar';
import s from './myGiftCards.module.scss'
import Gcard from '../../../../assets/imgs/gift.png'
import sad from '../../../../assets/imgs/sad.png'

function MyGiftCards(){

    
    let[gift, setGift] = useState([{ name:"Gift Card", image: Gcard, price: 40.50, amount: 15}, { name:"Gift Card", image: Gcard, price: 40.50, amount: 15}])
    //let gift= []

    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            <div className={s.container2}>
            <div>
                <h1>My Gift Cards</h1>
            </div>
            <div className={s.containerGift}>

                {   
                    gift.length>0 ?
                    gift.map((card, i) =>
                        <div key={i} className={s.containerCard}> 
                            <div>
                                <img src={card.image} alt='bookImage'></img>
                            </div>
                            <div className={s.text}>
                                <div>
                                    <h3>Virtual Gift Card</h3>
                                </div>
                                <div>
                                    <h3>${card.price}</h3>
                                </div>
                            </div>

                        </div>
                    ):
                    <div className={s.nocards}>
                        <div>
                            <h1>Don't have any gift cards right now</h1>
                        </div>
                        <div>
                            <img src={sad} alt='sad'/>
                        </div>
                        <div>             
                            <h1>Buy a GiftCard NOW!!!</h1>
                        </div>
                    </div>
                }


                
            </div>
            <Link to={'/gift'}>
                <button className={s.button}>GiftCards</button>
            </Link>
            </div>
            
        </div>
    )
}
export default MyGiftCards
