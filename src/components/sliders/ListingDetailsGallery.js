import React, {useEffect, useState} from 'react';
import Slider from "react-slick";


import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


function ListingDetailsGallery({data}) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [state, setState] = useState({
        items: []
    })

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    }, [slider1, slider2]);

    useEffect(() => {
        const images = []
        if (data?.images.length > 0) {
            data?.images.map(item => {
                images.push({
                    img: item
                })
            })
        }

        const obj = {
            items: images,
        }

        setState(obj)
    }, [data])


    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
        asNavFor: '.slider-nav',
        className: 'places-carousel gallery-carousel padding-top-35px'
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
            </>}
        </>
    );
}

export default ListingDetailsGallery;
