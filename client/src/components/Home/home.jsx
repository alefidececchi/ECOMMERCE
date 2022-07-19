
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../Slider/Slider.jsx"
import BookList from "../BookList/BookList";

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
            <BookList />
        </div>
    );
};



export default Home;