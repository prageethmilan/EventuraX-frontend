import React from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {FaRegEnvelope} from 'react-icons/fa';
import {FiExternalLink, FiPhone} from 'react-icons/fi';
import {GiPositionMarker} from 'react-icons/gi';
import Button from "../../common/Button";

function WidgetAuthor({advertisement}) {
    const createdAt = new Date(advertisement?.createdAt)
    const now = new Date();

    const timeDifference = now - createdAt;

    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(monthsAgo / 12);

    let postedTime = '';
    if (yearsAgo > 0) {
        postedTime = `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
    } else if (monthsAgo > 0) {
        postedTime = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else if (daysAgo > 0) {
        postedTime = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo > 0) {
        postedTime = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (minutesAgo > 0) {
        postedTime = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else {
        postedTime = 'Just now';
    }

    return (
        <>
            <div className="sidebar-widget">
                <div className="author-bio margin-bottom-30px">
                    <div className="d-flex align-items-center">
                        <img src={advertisement?.vendor?.logo} alt="author"/>
                        <div className="author-inner-bio">
                            <h4 className="author__title fw-bold pb-0 mb-1">
                                {advertisement?.vendor?.name}
                            </h4>
                            <p className="author__meta">
                                Posted {postedTime}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="info-list">
                    <ul>
                        {advertisement?.vendor?.address && <li className="mb-2">
                            <i className="la"><GiPositionMarker/></i> {advertisement?.vendor?.address}
                        </li>}
                        {advertisement?.vendor?.email && <li className="mb-2">
                            <i className="la"><FaRegEnvelope/></i> <a href={'mailto:' + advertisement?.vendor?.email}>
                            {advertisement?.vendor?.email}
                        </a>
                        </li>}
                        {advertisement?.vendor?.mobileNumber && <li className="mb-2">
                            <i className="la"><FiPhone/></i> {advertisement?.vendor?.mobileNumber}
                        </li>}
                        {advertisement?.vendor?.website && <li className="mb-2">
                            <i className="la"><FiExternalLink/></i> <a
                            href={advertisement?.vendor?.websiteUrl}>{advertisement?.vendor?.website}</a>
                        </li>}
                    </ul>
                </div>
                <div className="section-block-2 margin-top-35px margin-bottom-35px"></div>
                <div className="btn-box text-center">
                    <Button text="view Profile" url={`/vendor-profile?vendorId=${advertisement?.vendor?._id}`}
                            className="d-block">
                        <span className="d-inline-block"><AiOutlineUser/></span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default WidgetAuthor;
