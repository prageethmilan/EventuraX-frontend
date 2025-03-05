import React, {useEffect} from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import {FiCheckCircle} from 'react-icons/fi'
import Button from "../../components/common/Button";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import {useSearchParams} from "react-router-dom";
import * as paymentApi from '../../utils/api/payment';

function BookingConfirmation() {
    const [searchParams] = useSearchParams();

    useEffect(async () => {
        const sessionId = searchParams.get('session_id');
        await checkPayment(sessionId)
    }, []);

    const checkPayment = async (sessionId) => {
        const res = await paymentApi.verifyPayment(sessionId)
        console.log(res)
    }
    return (
        <main className="booking-confirmation-page">
            {/* Header */}
            <GeneralHeader/>

            <section className="booking-confirm-area padding-top-200px padding-bottom-140px overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="booking-confirm-page text-center">
                                <span className="la"><FiCheckCircle/></span>
                                <div className="section-heading pt-3">
                                    <h2 className="sec__title pt-0 mb-2 before-none">Thanks for your posting
                                        advertisement!</h2>
                                </div>
                                <div className="btn-box padding-top-30px">
                                    <Button text="Go to Home" url="/"/>
                                </div>
                            </div>
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

export default BookingConfirmation;
