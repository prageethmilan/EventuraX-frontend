import React from 'react';
import { BsEye } from 'react-icons/bs';
import BannerTwo from "../../components/banner/banner2/BannerTwo";
import LatestBlog from "../../components/blogs/LatestBlog";
import Button from "../../components/common/Button";
import GeneralHeader from "../../components/common/GeneralHeader";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import SectionDivider from "../../components/common/SectionDivider";
import SectionsHeading from "../../components/common/SectionsHeading";
import Footer from "../../components/common/footer/Footer";
import HowItWorkTwo from "../../components/hiw/hiw2/HowItWorkTwo";
import CtaOne from "../../components/other/cta/CtaOne";
import NewsLetter from "../../components/other/cta/NewsLetter";
import FunFactsTwo from "../../components/other/funfacts/FunFactsTwo";
import InfoBox3 from "../../components/other/infoboxes/InfoBox3";
import PopularDestination from "../../components/places/PopularDestination";
import RecommendedPlace from "../../components/places/RecommendedPlace";
import Authors from "../../components/sliders/Authors";
import ClientLogo from "../../components/sliders/ClientLogo";
import Testimonial from "../../components/sliders/Testimonial";
import sectiondata from "../../store/store";
import PopularCategories from "../../components/other/categories/PopularCategories";
import PopularCategoriesMore from "../../components/other/categories/PopularCategoriesMore";

function Home() {
    return (
        <main className="home-2">
            {/* Header */}
            <GeneralHeader />

            {/* Banner */}
            <BannerTwo bgImg={sectiondata.herobanners.banner2.bgimage} />

            <SectionDivider/>

            <section className="hiw-area padding-top-100px padding-bottom-80px after-none text-center">
                <div className="container">
                    <div className="row section-title-width text-center">
                        <SectionsHeading title={sectiondata.howitworks.hiw2.sectitle} desc={sectiondata.howitworks.hiw2.seccontent} />
                    </div>

                    <InfoBox3 infoitems={sectiondata.howitworks.hiw2.items} isbtnshow={true} />
                </div>
            </section>

            {/*<NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />*/}

            <Footer />

            <ScrollTopBtn />

        </main>
    );
}

export default Home;
