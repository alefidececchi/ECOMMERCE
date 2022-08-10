import React from 'react';
import { useState } from 'react';
import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import s from './discounts.module.scss'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from '../../../../Redux/thunks/booksThunks';
import { useNavigate } from 'react-router-dom';

function ProductDis({i, bookName, image, price, offer, estado, reload}){

   
    const [disc, setDisc] = useState(offer)
    
    const dispatch = useDispatch()

    let newPrice = 0

    const navigate  = useNavigate()
    function applyDisc(cambio) {
        let filtrado = estado.find(b => b.name === bookName)
        //console.log(filtrado)
        // console.log(filtrado._id)
        //console.log(estado)
        // console.log(price)
        // console.log(offer)
        // console.log(cambio.target.value)
        

        if(cambio.target.value === 'dis'){
            newPrice= price
        }else  if(cambio.target.value === '15'){
             newPrice = price - ((price * 15 )/ 100)
            //console.log(price)
        }else if(cambio.target.value === '25'){
            //console.log(price)
            newPrice = price - ((price * 25 )/ 100)    
        }
        else if(cambio.target.value === '50'){
             newPrice = price - ((price * 50 )/ 100)
            console.log(price)
        }else if(cambio.target.value === '75'){
            newPrice = price - ((price * 75 )/ 100)
            console.log(price)
        }
        else if(cambio.target.value === 'cancel'){
            newPrice = price 
        }
        console.log(newPrice)

        if(price > newPrice){
            axios({
                method: 'put',
                url: `/books/${filtrado._id}`,
                data: {
                    
                    
                    priceWithDiscount: newPrice,
                    inOffer: true                  
                }
            })
            .then(reload())
            setDisc(newPrice)
            
          
            
        }else{
            axios({
                method: 'put',
                url: `/books/${filtrado._id}`,
                data: {
                    
                    priceWithDiscount: newPrice,
                    inOffer: false                  
                }
            })
            .then(reload())
            
            setDisc(newPrice)
            
            
        }


    }

    
    return(
        
            <tr className={s.table_row}>
                <td  className={s.table_cell} scope='row'>{i +1}</td>
                <td className={s.table_cell}>
                    {image && <img className={s.producto} src={image} alt='imagen'/>}
                </td>
                <td className={s.table_cell}>{bookName}</td>
                <td className={s.table_cell}>${price} 
                    <select onChange={applyDisc}>
                        <option value={'dis'}>discount</option>
                        <option value={'15'}>15%</option>
                        <option value={'25'}>25%</option>
                        <option value={'50'}>50%</option>
                        <option value={'75'}>75%</option>
                        <option value={'cancel'}>Cancel Offer</option>
                    </select></td>
                <td className={s.table_cell}>${disc}</td>   
            </tr>
        
    )
}

export default ProductDis