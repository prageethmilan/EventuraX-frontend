import React from 'react';
import SectionsHeading from "../../common/SectionsHeading";
import BannerParticles from '../../other/BannerParticle';
import Banner3Tab from "./Banner3Tab";

function Banner3({bgImg, herotitle, herocontent}) {
    return (
        <>
            <section className="hero-wrapper hero-wrapper3" id="home" style={{backgroundImage: 'url('+bgImg+')',position: "relative"}}>
                <BannerParticles />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="hero-heading">
                                <SectionsHeading title={herotitle} desc={herocontent} />
                            </div>

                            <Banner3Tab />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Banner3;
