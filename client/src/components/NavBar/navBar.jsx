import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './navBar.module.scss'
import { BsFillCartFill, BsFillPersonLinesFill } from 'react-icons/bs';

const NavBar = () => {
  return (
    <div >
      <section> 
        <Outlet />
      </section>
      <nav  className={style.container}>
        <ul>
          <li>
            <Link to={'/'} >
              libritos.com
            </Link>
          </li>
          <li>
            <Link to={'/'}>
              Home
            </Link>
          </li>
          <li>
              <Link to={'/wish'} >
                Today's Deals
              </Link>
          </li>
          <li className={style.giftCard}>
              <Link to={'/wish'} >
                Gift Card
              </Link>
          </li>
          <li >
            <Link to={'/wish'} >
              WishList
            </Link>
          </li>
          <li>
            <Link to={'/shopping'}>
              <BsFillCartFill className={style.icon}/>
            </Link>
          </li>
          <li>
            <Link to={'/user'}>
              <BsFillPersonLinesFill className={style.icon}/>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
