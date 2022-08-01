import React from 'react';
import { useState } from 'react';
import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import s from './discounts.module.scss'

function ProductDis({i, bookName, image, price}){

    //let [price, setPrice] = useState()



    return(
        
            <tr className={s.table_row}>
                <td  className={s.table_cell} scope='row'>{i +1}</td>
                <td className={s.table_cell}>
                    {image && <img className={s.producto} src={image} alt='imagen'/>}
                </td>
                <td className={s.table_cell}>{bookName}</td>
                <td className={s.table_cell}>${price} <select>
                        <option>discount</option>
                        <option>15%</option>
                        <option>25%</option>
                        <option>50%</option>
                        <option>75%</option>
                    </select></td>
            </tr>
        
    )
}

export default ProductDis