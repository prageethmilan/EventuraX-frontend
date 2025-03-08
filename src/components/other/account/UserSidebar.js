import React from 'react';
import {FaRegEnvelope} from 'react-icons/fa';
import {FiCheck, FiPhone, FiPhoneCall} from 'react-icons/fi';
import {GiPositionMarker} from 'react-icons/gi';
import {IoMdGlobe} from 'react-icons/io';
import Tooltips from '../tooltips/Tooltips';
import ReactStars from "react-rating-stars-component/dist/react-stars";

function UserSidebar({usercontent}) {
    return (
        <>
            <div className="author-bio margin-bottom-30px">
                <div className="d-flex align-items-center">
                    <img src={usercontent?.logo} alt="author"/>
                    <div className="author-inner-bio">
                        <h4 className="author__title fw-bold pb-0 mb-1">{usercontent?.vendorName} <Tooltips id="t-1"
                                                                                                            title="Verified Account">
                            <i className="la tip tip-verified"><FiCheck/></i>
                        </Tooltips></h4>
                        {/*<p className="author__meta">*/}
                        {/*    {usercontent.date}*/}
                        {/*</p>*/}
                    </div>
                </div>
            </div>
            <div className="user-details d-flex align-items-center padding-bottom-30px">
                <div className="user-item author-review">
                    <h4 className="user__label">Reviews</h4>
                    <div className="rating-rating">
                        {usercontent && <ReactStars count={5} size={24} value={usercontent?.averageRating} isHalf={true}
                                                    edit={false}/>}
                        <span className="rating-count">{usercontent?.totalReviews}(Reviews)</span>
                    </div>
                </div>
                <div className="user-item author-listing">
                    <h4 className="user__label">Listings</h4>
                    <p className="userlist__number">{usercontent?.totalAdvertisements}</p>
                </div>
            </div>
            <div className="section-block-2"></div>
            <div className="user-contact padding-top-30px">
                <h3 className="widget-title pb-0 margin-bottom-20px">Contact Details</h3>
                <ul className="info-list padding-bottom-30px">
                    {usercontent?.address &&
                        <li><span className="la"><GiPositionMarker/></span> {usercontent?.address}</li>}
                    {usercontent?.mobileNumber &&
                        <li><span className="la"><FiPhone/></span> {usercontent?.mobileNumber}</li>}
                    {usercontent?.email && <li><span className="la"><FaRegEnvelope/></span><a
                        href={'mailto:' + usercontent?.email}> {usercontent?.email}</a></li>}
                    {usercontent?.website && <li><span className="la"><IoMdGlobe/></span><a
                        href={usercontent?.website}> {usercontent?.website}</a></li>}
                </ul>
                <div className="section-block-2"></div>

                {/*<SocialProfile socials={usercontent.socials}/>*/}
            </div>
            <div className="modal-wrapper">
                <a className="theme-btn border-0" href={`tel:+94${usercontent?.mobileNumber.slice(1)}`}>
                    <i className="la"><FiPhoneCall/></i> Call To Action
                </a>
            </div>
        </>
    );
}

export default UserSidebar;
