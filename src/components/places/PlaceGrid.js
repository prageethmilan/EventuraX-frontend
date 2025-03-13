import React from 'react';
import {Link} from "react-router-dom";
import {categories} from "../../const/dropdownData";
import {findObject} from "../../utils/util";
import {FiPhone} from "react-icons/fi";
import {IoIosLink} from "react-icons/io";
import {FaRegCalendarCheck} from "react-icons/fa";
import moment from "moment";

function PlaceGrid({advertisementsData}) {
    return (
        <>
            {advertisementsData?.advertisementList.map((item, index) => {
                return (
                    <div className="col-lg-4 column-td-6" key={index}>
                        <div className="card-item">
                            <Link to={`/listing-details?advertisementId=${item._id}`} className="card-image-wrap">
                                <div className="card-image">
                                    <img src={item.images[0]} className="card__img" alt="Place"/>
                                    <span
                                        className={item.isLimitedTimeOffer ? 'badge' : ''}>{item.isLimitedTimeOffer ? 'Limited Time Offers' : ''}</span>
                                </div>
                            </Link>
                            <div className="card-content-wrap">
                                <div className="card-content">
                                    <Link to={`/listing-details?advertisementId=${item._id}`}>
                                        <h4 className="card-title">{item.title}</h4>
                                        <p className="card-sub">
                                            {findObject(categories, item?.category)?.label}
                                        </p>
                                        <span
                                            className={item.isLimitedTimeOffer ? 'badge bg-success' : ''}>{item.isLimitedTimeOffer ? `${moment(item.offerStartDate).format('YYYY-MM-DD')} to ${moment(item.offerEndDate).format('YYYY-MM-DD')}` : ''}</span>
                                    </Link>
                                    <a href={`/vendor-profile?vendorId=${item?.vendorId}`}
                                       className="author-img">
                                        <img src={item?.logo} alt="author-img"/>
                                    </a>
                                    <ul className="info-list padding-top-20px">
                                        {item?.mobileNumber && <li><span
                                            className="la d-inline-block"><FiPhone/></span> {item?.mobileNumber}
                                        </li>}
                                        {item?.website &&
                                            <li><span className="la d-inline-block"><IoIosLink/></span> <a
                                                href={item?.website}>
                                                {item?.website}
                                            </a>
                                            </li>}
                                        <li>
                                            <span
                                                className="la d-inline-block"><FaRegCalendarCheck/></span> {moment(item.createdAt).format('YYYY-MM-DD')}
                                        </li>
                                    </ul>
                                </div>
                                <div className="rating-row">
                                    <div className="rating-rating">
                                        <h4 className={'text-danger'}>Rs. {item.price}.00</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default PlaceGrid;
