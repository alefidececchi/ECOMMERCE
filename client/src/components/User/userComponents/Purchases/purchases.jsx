import React from 'react';
import SideBar from '../../sideBar';
import s from './purchases.module.scss'
import Product from './product';
import jwt_decode from "jwt-decode"
import portada from '../../../../assets/imgs/hp.jpg'
import portada2 from '../../../../assets/imgs/LOTR.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Review from './review';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../../../Redux/thunks/usersThunks';

function Purchases(){

    const { bookById } = useSelector((state) => state.books);
    const[review, setReview] = useState(false)    
    let info = jwt_decode(window.localStorage.token); 
    let id = info.id
    console.log(info)
    const dispatch = useDispatch()
    useEffect(() => {
  
        dispatch(fetchUserById(id));
        //setReload(false)
        
      
  }, []); 
    
    function editOn(){
        setReview(true)
      }
    const editOff = () =>{
        setReview(false)
    }



    let[books, setBooks] = useState([{ bookName:"Harry Potter", image:portada, price: 40.50, amount: 15, state:'Nuevesito prro'}, {    bookName:"El Señor de los Anillos", image:portada2, price: 40.50, amount: 10, state:'Nuevesito prro'}])
    
    const rederProducts = () =>(

        <tbody>
            {books.map((book, i) =>(
                <Product 
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
            
            {   review ?(
                <div>
                    <Review editOff={editOff}  />
                </div>
            ):

                books.length>0?(                
                <div className={s.containerPur}>
                <table className={s.table}>
                    <caption className={s.table_cap}>PURCHASES<div><button onClick={editOn}>Reviews</button></div></caption>
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
export default Purchases