import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import dotimg1 from '../../assets/images/g-img1.jpg';


import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


function ListingDetailsGallery({data}) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [state, setState] = useState({
        items: [],
        slideDots: []
    })

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    }, [slider1, slider2]);

    useEffect(() => {
        const images = []
        const slideDots = []
        if (data?.images.length > 0) {
            data?.images.map(item => {
                images.push({
                    img: item
                })
                slideDots.push({
                    img: dotimg1
                })
            })
        }

        const obj = {
            items: images,
            slideDots: slideDots
        }

        setState(obj)
    }, [data])


    const settingsMain = {
        slidesToShow: state?.items.length > 1 ? 1 : state.items.length,
        slidesToScroll: 1,
        infinite: state?.items.length > 1,
        arrows: false,
        asNavFor: '.slider-nav',
        className: 'places-carousel gallery-carousel padding-top-35px'
    };
    const settingsThumbs = {
        slidesToShow: Math.min(state?.slideDots.length, 6),
        slidesToScroll: 1,
        infinite: state?.slideDots.length > 1,
        asNavFor: '.slider-for',
        dots: true,
        swipeToSlide: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    arrows: false,
                    slidesToShow: Math.min(state?.slideDots.length, 3)
                }
            },
            {
                breakpoint: 500,
                settings: {
                    arrows: false,
                    slidesToShow: Math.min(state?.slideDots.length, 2)
                }
            },
            {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    slidesToShow: Math.min(state?.slideDots.length, 1)
                }
            }
        ]
    };
    return (
        <>
            {state.items.length > 0 && <>
                <h2 className="widget-title">
                    Images
                </h2>
                <div className="title-shape"></div>
                <Slider
                    {...settingsMain}
                    asNavFor={nav2}
                    ref={slider => (setSlider1(slider))}
                >
                    {state?.items.map((slide, i) => {
                        return (
                            <div key={i} className="gallery-item">
                                <img src={slide.img} alt="Gallery"/>
                            </div>
                        )
                    })}
                </Slider>

                {state.slideDots.length > 1 && <div className="gallery-carousel-dots">
                    <Slider
                        {...settingsThumbs}
                        asNavFor={nav1}
                        ref={slider => (setSlider2(slider))}
                    >
                        {state?.slideDots.map((slide, i) => {
                            return (
                                <div key={i}>
                                    <img src={slide.img} alt=""/>
                                </div>
                            )
                        })}
                    </Slider>
                </div>}
            </>}
        </>
    );
}

export default ListingDetailsGallery;
