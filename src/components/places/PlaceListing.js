import React from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FiHeart, FiPhone } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";
import Tooltips from '../other/tooltips/Tooltips';

function PlaceListing({listitems}) {
    return (
        <>
            {listitems.map((item, index) => {
                return (
                    <div className="card-item card-listing d-flex" key={index}>
                        <Link to={item.titleUrl} className="card-image-wrap">
                            <div className="card-image">
                                <img src={item.image} className="card__img" alt="Place" />
                                <span className={item.titleIcon ? 'badge': 'badge badge-closed' }>{item.bedge}</span>
                                <Tooltips id="t-6" title="22 Likes"> 
                                    <span className="badge-toggle">
                                        <FiHeart />
                                    </span>
                                </Tooltips>

                            </div>
                        </Link>
                        <div className="card-content-wrap">
                            <div className="card-content">
                                <Link to={item.titleUrl}>
                                    <h5 className="card-meta">
                                        <span>{item.cardTypeIcon}</span> {item.cardType}
                                    </h5>
                                    <h4 className="card-title">{item.title}<i> {item.titleIcon}</i>
                                    </h4>
                                    <p className="card-sub">
                                        {item.stitle}
                                    </p>
                                </Link>
                                <a href={item.authorUrl} className="author-img">
                                    <img src={item.author} alt="author-img" />
                                </a>
                                <ul className="info-list padding-top-20px">
                                    <li><span className="la d-inline-block"><FiPhone /></span> {item.number}</li>
                                    <li><span className="la d-inline-block"><IoIosLink /></span>  <a href={item.websiteUrl}>
                                        {item.website}
                                    </a>
                                    </li>
                                    <li>
                                        <span className="la d-inline-block"><FaRegCalendarCheck /></span> {item.date}
                                    </li>
                                </ul>
                            </div>
                            <div className="rating-row">
                                <div className="rating-rating">
                                    {item.ratings.map((rating, index) => {
                                        return (
                                            <span key={index}>{rating}</span>
                                        )
                                    })}
                                    <span className="rating-count">{item.ratingNum}</span>
                                </div>
                                <div className="listing-info">
                                    <ul>
                                        <li>
                                            <span className="info__count"><AiOutlineEye /></span> {item.view}
                                        </li>
                                        <li>
                                            <Tooltips id="t-7" title="Bookmark">
                                            <span className="info__save">
                                                <FiHeart />
                                            </span>
                                            </Tooltips>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default PlaceListing;
