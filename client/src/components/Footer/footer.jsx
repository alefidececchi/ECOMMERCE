import s from "./footer.module.scss";
import React from 'react';
import { Link } from "react-router-dom"

const Footer = () => {
    return (

        <footer className={s.Footer}>

            <div className={s.Legal}>

                <h4>Legal</h4>
                <Link className={s.Links} to={"/home/"}>
                    <a >Privacy</a>
                </Link>
                <Link className={s.Links} to={"/home/"}>
                    <a>Terms</a>
                </Link>
                <Link className={s.Links} to={"/home/"}>
                    <a>License</a>
                </Link>

            </div>
            <Link className={s.Logos} to={"/home/"}>
                <i class="fab fa-linkedin fa-2x"></i>
            </Link>

            <Link className={s.Logos} to={"/home/"}>
                <i class="fab fa-instagram fa-2x"></i>
            </Link>
            <Link className={s.Logos} to={"/home/"}>
                <i class="fab fa-facebook-square fa-2x"></i>
            </Link>
            <Link className={s.Logos} to={"/home/"}>
                <i class="fab fa-twitter fa-2x"></i>
            </Link>

            <h4 className={s.LastLine}> © 2022 E-Commerce, libritos.com. All rights reserved.</h4>


        </footer>

    );
}

export default Footer;