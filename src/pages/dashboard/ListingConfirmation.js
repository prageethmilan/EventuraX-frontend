import React, {useEffect} from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import PersonalInfo from "../../components/other/account/PersonalInfo";
import WidgetBookingProduct from "../../components/sidebars/widgets/WidgetBookingProduct";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import {useLocation} from "react-router-dom";
import {findObject} from "../../utils/util";
import {categories} from "../../const/dropdownData";

function ListingConfirmation() {
    const location = useLocation();
    const {state} = location

    useEffect(() => {
        console.log(state)
    }, []);
    return (
        <main className="booking-page">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Listing Confirmation" img={breadcrumbimg}/>

            {/* Personal Information */}
            <section className="booking-area padding-top-40px padding-bottom-80px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <PersonalInfo vendor={state?.vendor} advertisementId={state?.advertisement._id}/>
                        </div>
                        <div className="col-lg-4">
                            <WidgetBookingProduct
                                img={state?.advertisement.images[0]}
                                title={state?.advertisement.title}
                                subtitle={`Rs. ${state?.advertisement.price}`}
                                cardType={findObject(categories, state?.advertisement.category)?.label}
                                // badge={state.badge}
                                cardLink={''}
                            />

                            {/*<WidgetBookingSummary*/}
                            {/*    title={state.summaryTitle}*/}
                            {/*    date={state.summaryDate}*/}
                            {/*    hour={state.summaryHour}*/}
                            {/*    adults={state.summaryAdults}*/}
                            {/*    children={state.summaryChildren}*/}
                            {/*    total={state.summaryTotal} />*/}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer/>

            <ScrollTopBtn/>

        </main>
    );
}

export default ListingConfirmation;
