import React from 'react';
import {BsListCheck} from "react-icons/bs";
import {MdStarBorder} from "react-icons/md";

function WidgetStaticsInfo({staticsinfo}) {
    return (
        <>
            <div className="sidebar-widget">
                <h3 className="widget-title">
                    Statics info
                </h3>
                <div className="title-shape"></div>
                <div className="info-list static-info padding-top-35px">
                    <ul>
                        <li className="mb-2">
                            <i className="la"><BsListCheck/></i> {staticsinfo?.vendor?.totalCompletedAds} listings
                        </li>
                        <li className="mb-2">
                            <i className="la"><MdStarBorder/></i> {staticsinfo?.vendor?.averageRating} ratings
                        </li>
                        <li className="mb-2">
                            <i className="la"><MdStarBorder/></i> {staticsinfo?.vendor?.totalReviews} reviews
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default WidgetStaticsInfo;
