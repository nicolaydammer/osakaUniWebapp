import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <h2> Rainfall </h2>
                <Slider {...settings}>
                    <div>
                        <h3>Europe</h3>
                        <heatmap></heatmap>
                    </div>
                    <div>
                        <h3>Japan</h3>
                        <heatmap></heatmap>
                    </div>
                </Slider>
            </div>
        );
    }
}
