
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./home.module.scss"
import Slider from "../Slider/Slider.jsx"

import BookList from "../BookList/BookList";
import Footer from "../Footer/footer";
import "react-loader-spinner"
import { BallTriangle } from 'react-loader-spinner'


export const data = [
    {
        Component: BallTriangle,
        props: {
            color: "#B881FF"
        },
        name: "Ball Triangle"
    }
]


const Home = () => {


    return (
        <div>
            <Slider />

            <header>
                <div>
                    <h3>searchBar</h3>
                </div>
                <div>
                    <h3>Filtros</h3>
                </div>

            </header>
            {/* <div className={s.loading}>
                < BallTriangle stroke="white" fill="white" />
            </div> */}

            {data.map((loader, index) => (
                <div className={s.loading} data-tip={loader.name} >
                    <loader.Component {...loader.props} />
                </div>
            ))}


            {BookList?.length === 0 && (
                <div >
                    < BallTriangle />
                </div>)}

            <BookList />
            <Footer/>
        </div>
    );
};



export default Home;
