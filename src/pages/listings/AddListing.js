import React from 'react';
import breadcrumbimg from '../../assets/images/bread-bg.jpg';
import AddPrice from "../../components/addlisting/AddPrice";
import GeneralInfo from "../../components/addlisting/GeneralInfo";
import PhotoUploader from "../../components/addlisting/PhotoUploader";
import Breadcrumb from "../../components/common/Breadcrumb";
import GeneralHeader from "../../components/common/GeneralHeader";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import Footer from "../../components/common/footer/Footer";
import NewsLetter from "../../components/other/cta/NewsLetter";
import sectiondata from "../../store/store";

const states = {
    breadcrumbimg: breadcrumbimg
}
function AddListing() {
    return (
        <main className="add-listing">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Add Listing" MenuPgTitle="Listings" img={states.breadcrumbimg} />

            {/* Add Listing */}
            <section className="add-listing-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto">
                            <GeneralInfo />

                            <PhotoUploader />

                            <AddPrice />

                            <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
                                <div className="billing-content p-0">
                                    <div className="btn-box mt-4">
                                        <button type="submit" className="theme-btn border-0">submit listing</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />

            {/* Footer */}
            <Footer />

            <ScrollTopBtn />

        </main>
    );
}

export default AddListing;
