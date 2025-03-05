import React, {useState} from 'react';
import {BsPencilSquare} from 'react-icons/bs';
import Select from "react-select";
import {categories} from "../../const/dropdownData";
import Flatpickr from 'react-flatpickr'
import {Editor} from "primereact/editor";
import Required from "../required/Required";
import {Input} from "reactstrap";

function GeneralInfo(props) {
    const [dateRange, setDateRange] = useState([])
    const [isLimitedTimeOffer, setIsLimitedTimeOffer] = useState(false)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')


    const onChangeDataHandler = (key, value) => {
        props.onSetDataHandler(key, value)
    }

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
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Listing Title<Required/></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <BsPencilSquare/>
                                            </span>
                                            <Input className="form-control" type="text" name="name"
                                                   value={props.data.title}
                                                   invalid={props.error.title}
                                                   placeholder="Enter your listing title"
                                                   onChange={(e) => onChangeDataHandler('title', e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Description</label>
                                        <div className="form-group">
                                            {/*<span className="la form-icon">*/}
                                            {/*    <BsPencil/>*/}
                                            {/*</span>*/}
                                            {/*<textarea className="message-control form-control" name="message"*/}
                                            {/*          placeholder="Write your listing description"></textarea>*/}
                                            <Editor value={props.data.description}
                                                    onTextChange={(e) => onChangeDataHandler("description", e.htmlValue)}
                                                    style={{height: '300px'}}
                                                    className={props.error.description ? 'is-invalid' : ''}
                                                    placeholder="Write your listing description"/>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Category<Required/></label>
                                        <div className="form-group mb-0">
                                            <Select
                                                placeholder="Select a Category"
                                                value={props.data.category}
                                                onChange={(value) => onChangeDataHandler('category', value)}
                                                className={props.error.category ? 'is-invalid' : ''}
                                                options={categories}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-2">
                                    <div className="input-box">
                                        <div className="form-group mb-0">
                                            <input type="checkbox" className='form-check-input'
                                                   value={props.data.isLimitedTimeOffer}
                                                   id={'limited-time-offer'}
                                                   onChange={(e) => onChangeDataHandler('isLimitedTimeOffer', e.target.checked)}
                                            />
                                            <label htmlFor={'limited-time-offer'} className="label-text ms-1"> Limited
                                                time offer</label>
                                        </div>
                                    </div>
                                </div>
                                {props.data.isLimitedTimeOffer && <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Date Range</label>
                                    </div>
                                    <Flatpickr
                                        value={props.data.dateRange}
                                        id="multi-dates-picker"
                                        className={`form-control ${props.error.dateRange ? 'is-invalid' : ''}`}
                                        options={{mode: "range"}}
                                        placeholder="Select Date Range"
                                        onChange={(date) => onChangeDataHandler('dateRange', date)}
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
