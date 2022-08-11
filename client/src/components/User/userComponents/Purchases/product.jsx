import React from 'react';
import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import s from './purchases.module.scss'

function Product({i, bookName, image, price}){
    return(
        
            <tr className={s.table_row}>
               
                <td className={s.table_cell}>
                    {image && <img className={s.producto} src={image} alt='imagen'/>}
                </td>
                <td className={s.table_cell}>{bookName}</td>
                <td className={s.table_cell}>${price}</td>
            </tr>
        
    )
}

export default Product