import SearchBar from "../SearchBar/searchBar";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchFilteredBooks } from "../../Redux/thunks/filterThunks";
import { resetFilters } from "../../Redux/slices/bookSlice";
import s from './header.module.scss'

const Header = () => {
  const dispatch = useDispatch();
  const initialState = {}
  const [filters, setFilters] = useState(initialState);
  const { genres } = useSelector(state => state.books);

  let filterValues = Object.values(filters);
  let filterKeys = Object.keys(filters);

  const handleOnClick = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
    console.log(e.target.value)
  }

  const handleReset = () => {
    setFilters({});
    dispatch(resetFilters());
  }

  const handleFilters = () => {
    // e.preventDefault()
    dispatch(fetchFilteredBooks(filters))
  }

  useEffect(() => {
    if(genres.length === 0) {
      dispatch(fetchGenres())
    }
  }, [dispatch]);


  return (
    <div>
      <header>
        <SearchBar />

        <div className={s.filtersContainer}>
          <ul>

            <li>Genres
              <ul>
                {genres.map(genre => <li><button name='genre' value={genre} onClick={handleOnClick}>{genre}</button></li>)}
              </ul>
            </li>
            {/* {filters.category ? <span>{filters.category}</span>: null} */}

            <li>Status
              <ul>
                <li><button name='status' value='false' onClick={handleOnClick}>New</button></li>
                <li><button name='status' value='true' onClick={handleOnClick}>Secondhand</button></li>
              </ul>
            </li>

            <li>Released
              <ul>
                <li><button name='released' value='desc' onClick={handleOnClick}>Latest</button></li>
                <li><button name='released' value='asc' onClick={handleOnClick}>Oldest</button></li>
              </ul>
            </li>

            <li>Order
              <ul>
                <li><button name='sort' value='asc' onClick={handleOnClick}>A-Z</button></li>
                <li><button name='sort' value='desc' onClick={handleOnClick}>Z-A</button></li>
              </ul>
            </li>

            <li>Price
              <ul>
                <li><button name='price' value='asc' onClick={handleOnClick}>Lowest to Highest</button></li>
                <li><button name='price' value='desc' onClick={handleOnClick}>Highest to Lowest</button></li>
              </ul>
            </li>

            <li>Language
              <ul>
                <li><button name='language' value='es' onClick={handleOnClick}>Spanish</button></li>
                <li><button name='language' value='en' onClick={handleOnClick}>English</button></li>
              </ul>
            </li>

            <li>Added
              <ul>
                <li><button name='added' value='Last week' onClick={handleOnClick}>Last week</button></li>
                <li><button name='added' value='Last month' onClick={handleOnClick}>Last month</button></li>
                <li><button name='added' value='Last year' onClick={handleOnClick}>Last year</button></li>
              </ul>
            </li>

            <li>Offers
              <ul>
                <li><button name='discount' value='asc' onClick={handleOnClick}>Yes</button></li>
                <li><button name='discount' value='desc' onClick={handleOnClick}>No</button></li>
              </ul>
            </li>
          </ul>

        </div>

        <div className={s.toFilter}>
          {filterValues.length ? filterValues.map(filter => <span>{filter}</span>) : null}
          {filterValues.length ? <button onClick={handleReset}>Reset</button> : null}
          {filterValues.length ? <button onClick={handleFilters}>Filter</button> : null}
        </div>
      </header>
    </div>
  );
}

export default Header;
