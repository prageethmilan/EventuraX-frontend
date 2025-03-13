import React from 'react';
import {FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp} from 'react-icons/fa';
import {MdStarBorder} from 'react-icons/md';
import {RiExternalLinkLine} from 'react-icons/ri';

import {Dropdown} from "react-bootstrap";
import {findObject} from "../../utils/util";
import {categories} from "../../const/dropdownData";
import {Badge} from "reactstrap";
import moment from "moment";

function ListingDetailsBreadcrumb({data}) {
    const currentUrl = window.location.href;
    const state = {
        title: 'Tasty Hand-Pulled Noodles',
        stitle: '101 East Parkview Road, New York',
        shareLinks: [
            {
                icon: <FaFacebookF/>,
                title: 'facebook',
                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(data?.title || '')}`
            },
            {
                icon: <FaTwitter/>,
                title: 'twitter',
                url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(data?.title || '')}`
            },
            {
                icon: <FaWhatsapp/>,
                title: 'whatsapp',
                url: `https://wa.me/?text=${encodeURIComponent(`Check out this advertisement: ${currentUrl}`)}`
            },
            {
                icon: <FaLinkedinIn/>,
                title: 'linkedin',
                url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
            }
        ]
    }

    return (
        <>
            <section className="breadcrumb-area listing-detail-breadcrumb">
                <div className="breadcrumb-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 position-relative">
                                <div className="breadcrumb-content">
                                    <h2 className="breadcrumb__title">
                                        {data?.title}
                                    </h2>
                                    {data?.isLimitedTimeOffer && <p className="breadcrumb__desc">
                                        <Badge className={'font-size-16 me-2'} color={"success"} pill={true}>Limited
                                            Time
                                            Offer</Badge>
                                        <Badge className={'font-size-16'} color={"success"}
                                               pill={true}>{`From ${moment(data?.offerStartDate).format('YYYY-MM-DD')} to ${moment(data?.offerEndDate).format('YYYY-MM-DD')}`}</Badge>
                                    </p>}
                                    <ul className="listing-info mt-3 mb-3">
                                        <li>
                                            <span className="theme-btn listing-tag">
                                                {findObject(categories, data?.category)?.label}
                                            </span>
                                        </li>
                                    </ul>
                                    <ul className="listing-info">
                                        <li>
                                            <Dropdown className="dropdown share-dropmenu">
                                                <Dropdown.Toggle
                                                    className="theme-btn dropdown-toggle border-0 after-none"
                                                    id="dropdown-basic">
                                                    <i className="d-inline-block"><RiExternalLinkLine/></i> share
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu">
                                                    {state.shareLinks.map((item, index) => {
                                                        return (
                                                            <Dropdown.Item href={item.url} target={"_blank"}
                                                                           className={'dropdown-item ' + item.title}
                                                                           key={index}>
                                                                <i className="d-inline-block">{item.icon}</i> {item.title}
                                                            </Dropdown.Item>
                                                        )
                                                    })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul>
                                </div>
                                <div className="report-list-items">
                                    <ul className="listing-info">
                                        <li>
                                            <a href={`/vendor-profile?vendorId=${data?.vendor?._id}`}
                                               className="theme-btn">
                                                <i className="d-inline-block"><MdStarBorder/></i> write a review
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bread-svg">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                        <path d="M-4.22,89.30 C280.19,26.14 324.21,125.81 511.00,41.94 L500.00,150.00 L0.00,150.00 Z"/>
                    </svg>
                </div>
            </section>

        </>
    );
}

export default ListingDetailsBreadcrumb;
