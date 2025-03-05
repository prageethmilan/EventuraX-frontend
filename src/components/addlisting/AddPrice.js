import React from 'react';
import {FaDollarSign} from 'react-icons/fa'
import Required from "../required/Required";
import {Input} from "reactstrap";

function AddPrice(props) {

    const onChangeDataHandler = (key, value) => {
        props.onSetDataHandler(key, value)
    }

    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">Pricing</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Price (Rs.)<Required/></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <FaDollarSign/>
                                            </span>
                                            <Input className="form-control" type="text" name="text"
                                                   invalid={props.error.price}
                                                   placeholder="Price" value={props.data.price}
                                                   onChange={(e) => onChangeDataHandler('price', e.target.value)}
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

export default AddPrice;
