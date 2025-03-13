import React from 'react';
import {GiPositionMarker} from 'react-icons/gi'
import {FaRegEnvelope} from 'react-icons/fa'
import {FiExternalLink, FiPhone} from 'react-icons/fi'

function ContactInfo({contactinfos}) {
    return (
        <>
            <div className="contact-listing padding-top-40px padding-bottom-40px">
                <h2 className="widget-title">
                    Contact Details
                </h2>
                <div className="title-shape"></div>
                <div className="info-list margin-top-35px padding-bottom-35px">
                    <ul>
                        {contactinfos?.address ? (
                            <li className="mb-2"><span><i className="la d-inline-block"><GiPositionMarker/></i> Address:</span>
                                {contactinfos.address}
                            </li>
                        ) : ''}
                        {contactinfos?.email ? (
                            <li className="mb-2"><span><i
                                className="la d-inline-block"><FaRegEnvelope/></i> Email:</span>
                                <a href={'mailto:' + contactinfos.email}>{contactinfos.email}</a>
                            </li>
                        ) : ''}
                        {contactinfos?.mobileNumber ? (
                            <li className="mb-2"><span><i className="la d-inline-block"><FiPhone/></i> Phone:</span>
                                {contactinfos.mobileNumber}
                            </li>
                        ) : ''}
                        {contactinfos?.website ? (
                            <li><span><i className="la d-inline-block"><FiExternalLink/></i> Website:</span>
                                <a href={contactinfos.websiteUrl}>{contactinfos.website}</a>
                            </li>
                        ) : ''}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ContactInfo;
