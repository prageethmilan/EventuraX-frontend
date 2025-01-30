import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import {FiEye, FiEyeOff, FiLock} from 'react-icons/fi';
import { Link } from "react-router-dom";
import SignInOptions from "./SignInOptions";

function SignUpBox({title, subtitle}) {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="billing-form-item mb-0">
                <div className="billing-title-wrap border-bottom-0 pe-0 ps-0 pb-0 text-center">
                    <h3 className="widget-title font-size-28 pb-0">
                        {title}
                    </h3>
                    <p className="font-size-16 fw-medium">
                        {subtitle}
                    </p>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">

                                <SignInOptions />

                                <div className="col-lg-12">
                                    <div className="account-assist mt-4 mb-4 text-center">
                                        <p className="account__desc">or</p>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">First name</label>
                                        <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser />
                                                </span>
                                            <input className="form-control" type="text" name="text" placeholder="First name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Last name</label>
                                        <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser />
                                                </span>
                                            <input className="form-control" type="text" name="text" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Email</label>
                                        <div className="form-group">
                                                <span className="form-icon">
                                                    <FaRegEnvelope />
                                                </span>
                                            <input className="form-control" type="email" name="text" placeholder="Enter email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">Password</label>
                                        <div className="form-group">
                                            <span className="form-icon">
                                                <FiLock/>
                                            </span>
                                            <input className="form-control" type={showPassword ? "text" : "password"} name="text"
                                                   placeholder="Password"/>
                                            <span
                                                className="eye-icon"
                                                onClick={handleShowPassword}
                                                style={{cursor: 'pointer'}}
                                            >
                                                {showPassword ? <FiEyeOff/> : <FiEye/>}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                    <label className="label-text">Confirm Password</label>
                                        <div className="form-group">
                                            <span className="form-icon">
                                                <FiLock/>
                                            </span>
                                            <input className="form-control" type={showPassword ? "text" : "password"}
                                                   name="text" placeholder="Confirm password"/>
                                            <span
                                                className="eye-icon"
                                                onClick={handleShowPassword}
                                                style={{cursor: 'pointer'}}
                                            >
                                                {showPassword ? <FiEyeOff/> : <FiEye/>}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="btn-box margin-top-20px margin-bottom-20px">
                                        <button className="theme-btn border-0" type="submit">
                                            Register account
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <p className="fw-medium">
                                        Already have an account? <Link to="/login" className="color-text">Login</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpBox;