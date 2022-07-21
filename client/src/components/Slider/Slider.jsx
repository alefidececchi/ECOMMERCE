
import React, { Component } from "react";
import Slider from "react-slick";
import s from "../Slider/Slider.module.scss"

export default class Responsive extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            // speed: 500,
            // centerMode: true,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,

                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
            ]


        };
        // console.log(window.screen.width)
        // console.log(settings.responsive[1].breakpoint)
        return (
            <div className={s.Container}>
                <Slider {...settings}>
                    <div >
                        <img className={s.img1}  src={window.screen.width < 400? require("./phone.jpeg"):window.screen.width >400 && window.screen.width < 768 ? require("./tablet.jpeg") : require("./142573-OTFJDG-584.jpeg")} alt="book slider" />

                    </div>

                    <div>
                        <img className={s.img1} src={window.screen.width < 400? require("./phone.jpeg"):window.screen.width >400 && window.screen.width < 768 ? require("./tablet.jpeg") : require("./142573-OTFJDG-584.jpeg")}alt="book slider"/>
                        {/* <img src="https://image.shutterstock.com/image-vector/promo-sale-banner-library-bookshop-260nw-1790872166.jpg" width="100%" height="300" alt="" /> */}
                    </div>
                    <div>
                        <img className={s.img1} src={window.screen.width < 400? require("./phone.jpeg"):window.screen.width >400 && window.screen.width < 768 ? require("./tablet.jpeg") : require("./142573-OTFJDG-584.jpeg")} alt="book slider"/>
                        {/* <img src="https://image.shutterstock.com/image-vector/promo-sale-banner-library-bookshop-260nw-1790872166.jpg" width="100%" height="300" alt="" /> */}
                    </div>
                    <div>
                        <img className={s.img1} src={window.screen.width < 400? require("./phone.jpeg"):window.screen.width >400 && window.screen.width < 768 ? require("./tablet.jpeg") : require("./142573-OTFJDG-584.jpeg")} alt="book slider"/>
                        {/* <img src="https://image.shutterstock.com/image-vector/promo-sale-banner-library-bookshop-260nw-1790872166.jpg" width="100%" height="300" alt="" /> */}
                    </div>

                </Slider></div>
        );
    }
}