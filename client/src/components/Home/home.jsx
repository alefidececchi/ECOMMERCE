import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./home.module.scss";
import Header from "../Header/header";
import Slider from "../Slider/Slider.jsx";
import NavBar from "../NavBar/navBar";
import BookList from "../BookList/BookList";
import Footer from "../Footer/footer";
import "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";
import {
  fetchAllBooks,
} from "../../Redux/thunks/booksThunks";




export const data = [
  {
    Component: BallTriangle,
    props: {
      color: "#B881FF",
    },
    name: "Ball Triangle",
  },
];

const Home = () => {


  // const pokemons = useSelector((state) => state.pokemons);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchPokemons = async () => {
  //     const pokemonsRes = await getPokemon();
  //     dispatch(setPokemons(pokemonsRes));
  //   };

  //   fetchPokemons();
  // }, []);


  return (
    <div className={s.mainContainer}>
      <NavBar />
      <div className={s.core}>
        <div className={s.slider}>
          <Slider />
        </div>
        <Header />
        

        {data.map((loader, index) => (
          <div className={s.loading} data-tip={loader.name}>
            <loader.Component {...loader.props} />
          </div>
        ))}

        {BookList?.length === 0 && (
          <div>
            <BallTriangle />
          </div>
        )}
        {/* <div className={s.loading}>
                < BallTriangle stroke="white" fill="white" />
            </div> */}
        <BookList />
        {/* <BookList books={books} /> */}
        <Footer />
      </div >
    </div >

  );
};

export default Home;
