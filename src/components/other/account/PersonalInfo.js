import React, {useState} from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {FaRegEnvelope} from 'react-icons/fa';
import {FiPhone} from 'react-icons/fi';
import payment1 from '../../../assets/images/payment-img.png';
import payment2 from '../../../assets/images/paypal.png';
import {Input} from "reactstrap";
import {toast} from "react-toastify";
import * as paymentApi from '../../../utils/api/payment'

const state = {
    paymentImg: payment1,
    paypalImg: payment2,
}

function PersonalInfo(props) {
    const [cardPayment, setCardPayment] = useState(false)

    const advertisementPaymentHandle = async () => {
        if (!cardPayment) return toast.error('Please select payment method', {icon: true, hideProgressBar: true});

        const data = {
            advertisementId: props.advertisementId,
            amount: 5,
            paymentMethod: cardPayment ? 'card' : ''
        }

        const res = await paymentApi.paymentHandleForAdvertisement(data)
        if (res) {
            window.location.href = res.sessionUrl
        }
    }

    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">Personal Information</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Name</label>
                                        <div className="form-group">
                                            <span className="la form-icon"><AiOutlineUser/></span>
                                            <Input className="form-control" type="text" name="text" placeholder="Name"
                                                   disabled value={props.vendor?.name}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Email</label>
                                        <div className="form-group mb-0">
                                            <span className="la form-icon"><FaRegEnvelope/></span>
                                            <Input className="form-control" type="email" name="text"
                                                   placeholder="Enter email address" value={props.vendor?.email}
                                                   disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">Phone</label>
                                        <div className="form-group mb-0">
                                            <span className="la form-icon"><FiPhone/></span>
                                            <Input className="form-control" type="text" name="text"
                                                   placeholder="Number" value={props.vendor?.mobileNumber} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="payment-option">
                    <div className="billing-title-wrap pt-0">
                        <h3 className="widget-title pb-0">Payment Method</h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="payment-method-wrap p-4">
                        <div className="payment-tab">
                            <div className="payment-trigger">
                                <label className="payment-radio">
                                    <Input type="radio" name="radio" value={cardPayment}
                                           onChange={(e) => setCardPayment(e.target.checked)}/>
                                    <span className="checkmark"></span>
                                    <span>Credit / Debit Card (USD 5.00)</span>
                                    <span className="card-icon float-end">
                                        <img src={state.paymentImg} alt="Payment"/>
                                    </span>
                                    {/*<div className="payment-content payment-active mt-3">
                                        <div className="contact-form-action">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="input-box">
                                                            <label className="label-text">Name on Card</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil/></span>
                                                                <input className="form-control" placeholder="Card Name"
                                                                       type="text" name="text" required=""/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-box">
                                                            <label className="label-text">Card Number</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil/></span>
                                                                <input className="form-control" name="text"
                                                                       placeholder="1234  5678  9876  5432" required=""
                                                                       type="text"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="input-box">
                                                            <label className="label-text">Expiry Month</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil/></span>
                                                                <input className="form-control" placeholder="MM"
                                                                       required="" name="text" type="text"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="input-box">
                                                            <label className="label-text">Expiry Year</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil/></span>
                                                                <input className="form-control" placeholder="YY"
                                                                       required="" name="text" type="text"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="input-box">
                                                            <label className="label-text">CVV</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil/></span>
                                                                <input className="form-control" placeholder="CVV"
                                                                       required="" name="text" type="text"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>*/}
                                </label>
                            </div>
                        </div>
                        <div className="section-block-2 mt-4"></div>
                        <div className="btn-box mt-4">
                            <button className="theme-btn border-0 mt-3" onClick={advertisementPaymentHandle}>
                                confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalInfo;
