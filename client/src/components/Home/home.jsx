import React, {useState} from 'react';
import s from './home.module.scss'

const Home = () => {
  const initialState = {}

  const [filters, setFilters] = useState(initialState);

  let filterValues = Object.values(filters);

  const handleOnClick = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
    console.log(filterValues.length)
  }

  const handleReset = () => {
    setFilters({ });
    console.log('sirvo');
  }

  return (
    <div>
      <header>
        <form>
          <input type="search"/>
          <input type="submit" value="Search"/>
        </form>

        <div className={s.filtersContainer}>
          <ul>

            <li>Category
              <ul>
                <li><button name='category' value='Action' onClick={handleOnClick}>Action</button></li>
                <li><button name='category' value='Adventure' onClick={handleOnClick}>Adventure</button></li>
                <li><button name='category' value='Classics' onClick={handleOnClick}>Classics</button></li>
                <li><button name='category' value='Mystery' onClick={handleOnClick}>Mystery</button></li>
                <li><button name='category' value='Fantasy' onClick={handleOnClick}>Fantasy</button></li>
                <li><button name='category' value='Horror' onClick={handleOnClick}>Horror</button></li>
              </ul>
            </li>
            {/* {filters.category ? <span>{filters.category}</span>: null} */}

            <li>Status
              <ul>
                <li><button name='status' value='New' onClick={handleOnClick}>New</button></li>
                <li><button name='status' value='Secondhand' onClick={handleOnClick}>Secondhand</button></li>
              </ul>
            </li>

            <li>Year
              <ul>
                <li><button name='year' value='Latest' onClick={handleOnClick}>Latest</button></li>
                <li><button name='year' value='Oldest' onClick={handleOnClick}>Oldest</button></li>
              </ul>
            </li>

            <li>Order
              <ul>
                <li><button name='order' value='AZ' onClick={handleOnClick}>A-Z</button></li>
                <li><button name='order' value='ZA' onClick={handleOnClick}>Z-A</button></li>
              </ul>
            </li>

            <li>Price
              <ul>
                <li><button name='price' value='Cheap' onClick={handleOnClick}>Cheap</button></li>
                <li><button name='price' value='Expensive' onClick={handleOnClick}>Expensive</button></li>
              </ul>
            </li>

            <li>Language
              <ul>
                <li><button name='language' value='Spanish' onClick={handleOnClick}>Spanish</button></li>
                <li><button name='language' value='English' onClick={handleOnClick}>English</button></li>
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
                <li><button name='offers' value='Yes' onClick={handleOnClick}>Yes</button></li>
                <li><button name='offers' value='No' onClick={handleOnClick}>No</button></li>
              </ul>
            </li>
          </ul>

        </div>

        <div className={s.toFilter}>
          {filterValues.length ? filterValues.map(filter => <span>{filter}</span>): null}
          {filterValues.length ? <button onClick={handleReset}>Reset</button>: null}
          {filterValues.length ? <button>Filter</button>: null}
        </div>
      </header>
    </div>
  );
}

export default Home;
