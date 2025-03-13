import React from 'react';
import Button from "../../common/Button";

function WidgetBooking({data}) {

    return (
        <>
            <div className="sidebar-widget date-widget">
                <h3 className="widget-title">
                    Booking
                </h3>
                <div className="title-shape"></div>
                <div className="btn-box text-center padding-top-35px">
                    <Button text="Call To Action" url={`tel:+94${data?.vendor?.mobileNumber.slice(1)}`}
                            className="d-block"/>
                </div>
            </div>
        </>
    );
}

export default WidgetBooking;
