import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <section>
        <Outlet />
      </section>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>
              Home
            </Link>
          </li>
            <li>
              <Link to={'/shopping'}>
                Cart
              </Link>
            </li>
            <li>
              <Link to={'/user'}>
                User
              </Link>
            </li>
            <li>
              <Link to={'/wish'}>
                WishList
              </Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
