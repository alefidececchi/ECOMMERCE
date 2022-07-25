import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./home.module.scss";
import Header from "../Header/header";
import Slider from "../Slider/Slider.jsx";
import NavBar from "../NavBar/navBar";
import BookList from "../BookList/BookList";
import Footer from "../Footer/footer";
import "react-loader-spinner";
import {
  fetchAllBooks
} from "../../Redux/thunks/booksThunks";





const Home = () => {

  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);


  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchAllBooks());
    }
  }, [dispatch, books]);

  


  return (
    <div className={s.mainContainer}>
      <NavBar />
      <div className={s.core}>
        <div className={s.slider}>
          <Slider />
        </div>
        <Header />
        <BookList books={books.books} />
        <Footer />
      </div >
    </div >

  );
};

export default Home;
