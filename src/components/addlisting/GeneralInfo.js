import React, {useState} from 'react';
import { AiOutlineTags } from 'react-icons/ai';
import { BsPencil, BsPencilSquare, BsQuestion } from 'react-icons/bs';
import Select from "react-select";
import Tooltips from '../other/tooltips/Tooltips';
import {categories} from "../../const/dropdownData";
import Flatpickr from 'react-flatpickr'

function GeneralInfo() {
    const [dateRange, setDateRange] = useState([])
    const [isLimitedTimeOffer, setIsLimitedTimeOffer] = useState(false)

    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">General Information</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Listing Title</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <BsPencilSquare/>
                                            </span>
                                            <input className="form-control" type="text" name="name"
                                                   placeholder="Enter your listing title"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text d-flex align-items-center ">Keywords
                                            <Tooltips id="t-2"
                                                      title="Maximum of 15 keywords related with your business">
                                                <i className="la tip ms-1">
                                                    <BsQuestion/>
                                                </i>
                                            </Tooltips>
                                        </label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <AiOutlineTags/>
                                            </span>
                                            <input className="form-control" type="text" name="name"
                                                   placeholder="Keywords should be separated by commas"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Description</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <BsPencil/>
                                            </span>
                                            <textarea className="message-control form-control" name="message"
                                                      placeholder="Write your listing description"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Category</label>
                                        <div className="form-group mb-0">
                                            <Select
                                                placeholder="Select a Category"
                                                options={categories}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-2">
                                    <div className="input-box">
                                        <div className="form-group mb-0">
                                            <input type="checkbox" className='form-check-input' value={isLimitedTimeOffer}
                                                   id={'limited-time-offer'} onChange={() => setIsLimitedTimeOffer(!isLimitedTimeOffer)}/>
                                            <label htmlFor={'limited-time-offer'} className="label-text ms-1"> Limited
                                                time offer</label>
                                        </div>
                                    </div>
                                </div>
                                {isLimitedTimeOffer && <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Date Range</label>
                                    </div>
                                    <Flatpickr
                                        value={dateRange}
                                        id="multi-dates-picker"
                                        className="form-control"
                                        options={{mode: "range"}}
                                        onChange={date => setDateRange(date)}
                                    />
                                </div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
);
}

export default GeneralInfo;
