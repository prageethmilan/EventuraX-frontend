import React, {useEffect, useState} from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import ListingDetailsBreadcrumb from "./ListingDetailsBreadcrumb";
import ListingDetailsSidebar from "../../components/sidebars/ListingDetailsSidebar";
import ListingDetailsGallery from "../../components/sliders/ListingDetailsGallery";
import ContactInfo from "../../components/contact/ContactInfo";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import {useLocation} from "react-router-dom";
import * as advertisementApi from "../../utils/api/advertisement"

function ListingDetails() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const [advertisementData, setAdvertisementData] = useState(null)

    useEffect(() => {
        loadAdvertisementDetails()
    }, []);

    const loadAdvertisementDetails = async () => {
        const advertisementId = queryParams.get('advertisementId')
        const res = await advertisementApi.getAdvertisementDetails(advertisementId)
        if (res) {
            setAdvertisementData(res)
        }
    }

    return (
        <main className="listing-details">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <ListingDetailsBreadcrumb data={advertisementData}/>

            {/*<ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={sectiondata.listingDetails.videoid}*/}
            {/*            onClose={() => this.setState({isOpen: false})}/>*/}
            <section className="single-listing-area padding-top-35px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="single-listing-wrap">
                                {advertisementData?.images.length !== 0 &&
                                    <ListingDetailsGallery data={advertisementData}/>}

                                <div className="listing-description padding-top-40px padding-bottom-35px">
                                    <h2 className="widget-title">
                                        Description
                                    </h2>
                                    <div className="title-shape"></div>
                                    <div className="section-heading mt-4">
                                        <p className="sec__desc font-size-16"
                                           dangerouslySetInnerHTML={{__html: advertisementData?.description}}>
                                        </p>
                                    </div>
                                </div>

                                <div className="listing-description padding-top-40px padding-bottom-35px">
                                    <h2 className="widget-title">
                                        Price
                                    </h2>
                                    <div className="title-shape"></div>
                                    <div className="section-heading mt-4">
                                        <p className={'font-size-27 text-danger font-weight-bold'}>Rs. {advertisementData?.price}</p>
                                    </div>
                                </div>

                                <ContactInfo contactinfos={advertisementData?.vendor}/>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <ListingDetailsSidebar data={advertisementData}/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            {/*<NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />*/}

            {/* Footer */}
            <Footer/>

            <ScrollTopBtn/>
        </main>
    );
}

export default ListingDetails;
