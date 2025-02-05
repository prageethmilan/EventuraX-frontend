import React, {Component} from 'react';
import { FiMap } from 'react-icons/fi'
import { FaMapSigns } from 'react-icons/fa'
import Select from "react-select";
import {locations} from "../../const/dropdownData";

class AddLocation extends Component {

    render() {
        return (
            <>
                <div className="billing-form-item">
                    <div className="billing-title-wrap">
                        <h3 className="widget-title pb-0">
                            Add Location
                        </h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="billing-content">
                        <div className="contact-form-action">
                            <form method="post">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">Address</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <FiMap />
                                                </span>
                                                <input className="form-control" type="text" name="name" placeholder="Your address" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">Temporary Address</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <FaMapSigns />
                                                </span>
                                                <input className="form-control" type="text" name="name" placeholder="Temporary address" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">District</label>
                                            <div className="form-group">
                                                <Select
                                                    placeholder="Select a District"
                                                    options={locations}
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
}

export default AddLocation;