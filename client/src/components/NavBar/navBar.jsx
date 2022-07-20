import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './navBar.module.scss'
import cart from '../../assets/imgs/cart.png'
import user from '../../assets/imgs/user.png'

const NavBar = () => {
  return (
    <div className={style.container}>
      <section>
        <Outlet />
      </section>
      <nav  className={style.container}>
        <ul>
          <li className={style.nombre}>
            <Link to={'/home'} className={style.titulo}>
              NOMBRE DE LA PAGINA
            </Link>
          </li>
          <li className={style.all}>
            <Link to={'/user'}className={style.linkAll}>
              All
            </Link>
          </li>
          <li className={style.today}>
              <Link to={'/wish'} className={style.items}>
                Today's Deals
              </Link>
          </li>
          <li className={style.giftCard}>
              <Link to={'/wish'} className={style.items}>
                Gift Card
              </Link>
          </li>
          <li className={style.cart}>
            <Link to={'/shopping'}>
              <img src={cart} alt='cart' className={style.images}/>
            </Link>
          </li>
          <li className={style.user} >
            <Link to={'/user'}>
              <img src={user} alt='cart' className={style.images}/>
            </Link>
          </li>
          <li className={style.wishList}>
            <Link to={'/wish'} className={style.items}>
              WishList
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
