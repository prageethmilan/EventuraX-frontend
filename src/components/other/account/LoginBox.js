import React, {useState} from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {FiEye, FiEyeOff, FiLock} from 'react-icons/fi';
import {Link} from "react-router-dom";
import SignInOptions from "./SignInOptions";
import {normalLoginVendorValidation} from "../../../utils/validations/validation";
import {Input} from "reactstrap";
import {normalVendorLoginErrors} from "../../../utils/validations/error";
import {showError} from "../../../utils/util";
import * as loginApi from '../../../utils/api/login';

function LoginBox({title, subtitle}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState(normalVendorLoginErrors)

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const loginUserHandler = async () => {
        const res = normalLoginVendorValidation(email, password)
        setError(res)

        for (const key in res) {
            if (res[key]) {
                showError()
                return
            }
        }

        await loginHandler()
    }

    const loginHandler = async () => {
        const data = {
            email, password
        }

        const res = await loginApi.loginUser(data)
        if (res && res?.status) {
            window.open('/', '_self')
        }
    }

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
                        <div className="row">

                            <SignInOptions/>

                            <div className="col-lg-12">
                                <div className="account-assist mt-4 mb-4 text-center">
                                    <p className="account__desc">or</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="input-box">
                                    <label className="label-text">Email</label>
                                    <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser/>
                                                </span>
                                        <Input className="form-control" type="email" name="text" placeholder="Email"
                                               onChange={(e) => setEmail(e.target.value)} invalid={error.email}/>
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
                                        <Input className="form-control" type={showPassword ? "text" : "password"}
                                               name="text"
                                               placeholder="Password"
                                               onChange={(e) => setPassword(e.target.value)}
                                               invalid={error.password}
                                        />
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
                                <div className="form-group">
                                    <div
                                        className="custom-checkbox me-0 d-flex align-items-center justify-content-between">
                                        <div>
                                            <Link to="/recover" className="color-text fw-medium">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="btn-box margin-top-20px margin-bottom-20px">
                                    <button className="theme-btn border-0" type="button" onClick={loginUserHandler}>
                                        Login now
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <p className="fw-medium">Not a member? <Link to="/sign-up"
                                                                             className="color-text"> Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginBox;