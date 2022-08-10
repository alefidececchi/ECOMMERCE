import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./home.module.scss";
import { fetchUserById } from "../../Redux/thunks/usersThunks";
import Header from "../Header/header";
import Slider from "../Slider/Slider.jsx";
import NavBar from "../NavBar/navBar";
import BookList from "../BookList/BookList";
import Footer from "../Footer/footer";
import jwt_decode from "jwt-decode";
import "react-loader-spinner";
import {
  fetchAllBooks
} from "../../Redux/thunks/booksThunks";


const Home = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { filterEmpty } = useSelector((state) => state.books);
  
  
  useEffect(() => {
    if(window.localStorage.getItem("token")){
      let info = JSON.stringify(jwt_decode(window.localStorage.getItem("token")));
      let inforNormalized = JSON.parse(info);
      dispatch(fetchUserById(inforNormalized.id))
    }
  }, [dispatch, books]);

  useEffect(() => {
    if (books.length === 0 && !filterEmpty) {
      dispatch(fetchAllBooks());
    }
  }, [dispatch]);

  return (
    <div className={s.mainContainer}>
      <NavBar />
      <div className={s.core}>
        <div className={s.slider}>
          <Slider />
        </div>
        <Header />
        <BookList books={books} />
        <Footer />
      </div>
    </div>

  );
};

export default Home;
