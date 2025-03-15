import React from 'react';
import BannerTwo from "../../components/banner/banner2/BannerTwo";
import GeneralHeader from "../../components/common/GeneralHeader";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import SectionDivider from "../../components/common/SectionDivider";
import SectionsHeading from "../../components/common/SectionsHeading";
import Footer from "../../components/common/footer/Footer";
import InfoBox3 from "../../components/other/infoboxes/InfoBox3";
import sectiondata from "../../store/store";

function Home() {
    return (
        <main className="home-2">
            {/* Header */}
            <GeneralHeader/>

            {/* Banner */}
            <BannerTwo bgImg={sectiondata.herobanners.banner2.bgimage}/>

            <SectionDivider/>

            <section className="hiw-area padding-top-100px padding-bottom-80px after-none text-center">
                <div className="container">
                    <div className="row section-title-width text-center">
                        <SectionsHeading title={sectiondata.howitworks.hiw2.sectitle}
                                         desc={sectiondata.howitworks.hiw2.seccontent}/>
                    </div>

                    <InfoBox3 infoitems={sectiondata.howitworks.hiw2.items} isbtnshow={true}/>
                </div>
            </section>

            {/*<NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />*/}

            <Footer/>

            <ScrollTopBtn/>

        </main>
    );
}

export default Home;
