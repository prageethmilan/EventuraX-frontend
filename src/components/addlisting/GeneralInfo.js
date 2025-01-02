import React from 'react';
import { AiOutlineTags } from 'react-icons/ai';
import { BsPencil, BsPencilSquare, BsQuestion } from 'react-icons/bs';
import Select from "react-select";
import Tooltips from '../other/tooltips/Tooltips';

const state = {
    title: 'General Information',
    selectedCatOp: null,
    categories: [
        {
            value: 0,
            label: 'Select a category'
        },
        {
            value: 2,
            label: 'Shops'
        },
        {
            value: 3,
            label: 'Hotels'
        },
        {
            value: 4,
            label: 'Restaurants'
        },
        {
            value: 5,
            label: 'Fitness'
        },
        {
            value: 6,
            label: 'Travel'
        },
        {
            value: 7,
            label: 'Salons'
        },
        {
            value: 8,
            label: 'Event'
        },
        {
            value: 9,
            label: 'Business'
        },
    ]
}
function GeneralInfo() {
    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">{state.title}</h3>
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
                                                <BsPencilSquare />
                                            </span>
                                            <input className="form-control" type="text" name="name" placeholder="Enter your listing title" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text d-flex align-items-center ">Keywords
                                        <Tooltips id="t-2" title="Maximum of 15 keywords related with your business">
                                        <i className="la tip ms-1">
                                                <BsQuestion />
                                            </i>
                                        </Tooltips>
                                        </label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <AiOutlineTags />
                                            </span>
                                            <input className="form-control" type="text" name="name" placeholder="Keywords should be separated by commas" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Description</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <BsPencil />
                                            </span>
                                            <textarea className="message-control form-control" name="message" placeholder="Write your listing description"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Category</label>
                                        <div className="form-group mb-0">
                                            <Select
                                                placeholder="Select a Category"
                                                options={state.categories}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GeneralInfo;
