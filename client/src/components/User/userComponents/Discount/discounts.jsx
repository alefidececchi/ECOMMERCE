import React from 'react';
import SideBar from '../../sideBar';
import s from './discounts.module.scss'
import ProductDis from './productDis';

import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Discounts(){

    let[books, setBooks] = useState([{ bookName:"Harry Potter", image:portada, price: 40.50, amount: 15, state:'Nuevesito prro'}, {    bookName:"El Señor de los Anillos", image:portada2, price: 40.50, amount: 10, state:'Nuevesito prro'}])
    //let books = []
    const rederProducts = () =>(

        <tbody>
            {books.map((book, i) =>(
                <ProductDis 
                key={i}
                i = {i}
                bookName={book.bookName}
                image={book.image}
                price={book.price}

                />
            ))}
        </tbody>

    )

    return(
        <div className={s.container}>
            <div className={s.containerSide}>
            <SideBar/>
            </div>
            
            {
                books.length>0?
(                <div className={s.containerPur}>
                <table className={s.table}>
                    <caption className={s.table_cap}>APPLY DISCOUNTS</caption>
                    <thead className={s.table_head}>
                        <tr className={s.table_row}>
                            <th className={s.table_heading} scope='col'>#</th>
                            <th className={s.table_heading} scope='col'>Book</th>
                            <th className={s.table_heading} scope='col'>Name</th>
                            <th className={s.table_heading} scope='col'>Precio</th>
                        </tr>
                    </thead>
                    {rederProducts()}
                </table>
                </div>):
                <div className={s.vacio}>
                    <div>
                     <h1>Not purchases  yet</h1>
                    </div>
                    <div>
                        <h1>Buy now!!!</h1>
                    </div>
                    <div>
                        <Link to={'/'}>
                            <button >Sell</button> 
                        </Link>
                    </div>
                </div>
             }

        </div>
    )
}
export default Discounts

