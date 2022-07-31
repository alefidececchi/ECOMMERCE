// //import s from './sideBar.module.scss'
// import React from 'react';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import SideBar from '../../sideBar';
// import s from './myGiftCards.module.scss'
// import portada from '../../../../assets/imgs/hp.jpg'

// function Gift(){

    
//     let[gift, setGift] = useState([{ name:"Gift Card", image: portada, price: 40.50, amount: 15}])
//     //let gift= []

//     return(
//         <div className={s.container}>
//             <div className={s.containerSide}>
//             <SideBar/>
//             </div>
//             <div className={s.containerGift}>
//                 {   
//                     gift.length>0 ?
//                     gift.map((card, i) =>
//                         <div key={i}>
//                             <div>
//                                 <h1>My Gift Cards</h1>
//                             </div>
//                             <div>
//                                 <img src={card.image} alt='bookImage'></img>
//                             </div>
//                             <div>
//                                 <div>
//                                     <h3>Virtual Gift Card</h3>
//                                 </div>
//                                 <div>
//                                     <h3>${card.price}</h3>
//                                 </div>
//                             </div>
//                             <div>
//                                 <Link to={'/wish'}>
//                                     <button>GiftCards</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     ):
//                     <div>
//                         <div>
//                             <h1>Buy a GiftCard</h1>
//                         </div>
//                     </div>
//                 }
//                 <Link to={'/wish'}>
//                     <button>GiftCards</button>
//                 </Link>




                
//             </div>
//         </div>
//     )
// }
// export default Gift