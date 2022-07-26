import s from "./header.module.scss";
import SearchBar from "../SearchBar/searchBar";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGenres,
  fetchFilteredBooks,
} from "../../Redux/thunks/filterThunks";
import {
  resetFilters,
  saveFilterObject,
  resetObjectFilter,
} from "../../Redux/slices/bookSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.books);
  const { filterEmpty } = useSelector((state) => state.books);
  const { filterObject } = useSelector((state) => state.books);

  let filterValues = Object.values(filterObject);

  const handleOnClick = (e) => {
    dispatch(saveFilterObject({ key: e.target.name, value: e.target.value }));
  };

  const handleReset = () => {
    dispatch(resetObjectFilter());
    dispatch(resetFilters());
  };

  const handleFilters = () => {
    dispatch(fetchFilteredBooks(filterObject));
  };

  const handleAlert = () => {
    Swal.fire({
      title: "Sorry!",
      text: "No results were found with the parameters indicated.",
      icon: "error",
      button: "OK",
      confirmButtonColor: '#3f37c9'
    }).then((response) => {
      if(response.isConfirmed) {
        dispatch(resetFilters());
      }
    })
  }

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [dispatch]);

  return (
    <div>
      <header>
        <SearchBar />

        <div className={s.filtersContainer}>
          <ul>
            <li>
              Genres
              <ul>
                {genres.map((genre) => (
                  <li>
                    <button name="genre" value={genre} onClick={handleOnClick}>
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              Status
              <ul>
                <li>
                  <button name="status" value="new" onClick={handleOnClick}>
                    New
                  </button>
                </li>
                <li>
                  <button
                    name="status"
                    value="secondhand"
                    onClick={handleOnClick}
                  >
                    Secondhand
                  </button>
                </li>
              </ul>
            </li>

            <li>
              Sort
              <ul>
                <li>
                  <button name="sort" value="AZ" onClick={handleOnClick}>
                    A-Z
                  </button>
                </li>
                <li>
                  <button name="sort" value="ZA" onClick={handleOnClick}>
                    Z-A
                  </button>
                </li>
                <li>
                  <button
                    name="sort"
                    value="lowest to highest"
                    onClick={handleOnClick}
                  >
                    Lowest to Highest
                  </button>
                </li>
                <li>
                  <button
                    name="sort"
                    value="highest to lowest"
                    onClick={handleOnClick}
                  >
                    Highest to Lowest
                  </button>
                </li>
                <li>
                  <button name="sort" value="latest" onClick={handleOnClick}>
                    Latest
                  </button>
                </li>
                <li>
                  <button name="sort" value="oldest" onClick={handleOnClick}>
                    Oldest
                  </button>
                </li>
              </ul>
            </li>

            <li>
              Language
              <ul>
                <li>
                  <button name="language" value="es" onClick={handleOnClick}>
                    Spanish
                  </button>
                </li>
                <li>
                  <button name="language" value="en" onClick={handleOnClick}>
                    English
                  </button>
                </li>
              </ul>
            </li>

            <li>
              Added
              <ul>
                <li>
                  <button
                    name="added"
                    value="Last week"
                    onClick={handleOnClick}
                  >
                    Last week
                  </button>
                </li>
                <li>
                  <button
                    name="added"
                    value="Last month"
                    onClick={handleOnClick}
                  >
                    Last month
                  </button>
                </li>
                <li>
                  <button
                    name="added"
                    value="Last year"
                    onClick={handleOnClick}
                  >
                    Last year
                  </button>
                </li>
              </ul>
            </li>

            <li>
              Offers
              <ul>
                <li>
                  <button name="discount" value="asc" onClick={handleOnClick}>
                    Yes
                  </button>
                </li>
                <li>
                  <button name="discount" value="desc" onClick={handleOnClick}>
                    No
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className={s.toFilter}>
          {filterValues.length
            ? filterValues.map((filter) => <span>{filter}</span>)
            : null}
          {filterValues.length ? (
            <button onClick={handleFilters}>Filter</button>
          ) : null}
          {filterValues.length ? (
            <button onClick={handleReset}>Reset</button>
          ) : null}
        </div>

        {filterEmpty
          ? handleAlert()
          : null}
      </header>
    </div>
  );
};

export default Header;
