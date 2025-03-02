import React, {useState} from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {FaRegEnvelope} from 'react-icons/fa';
import {FiEye, FiEyeOff, FiLock} from 'react-icons/fi';
import {Link, useNavigate} from "react-router-dom";
import SignInOptions from "./SignInOptions";
import {Input} from "reactstrap";
import {normalVendorSignUpErrors} from "../../../utils/validations/error";
import {EMAIL_REGEX, normalSignupVendorValidation, PASSWORD_REGEX} from "../../../utils/validations/validation";
import {showError} from "../../../utils/util";
import * as vendorApi from '../../../utils/api/vendor';
import {toast} from "react-toastify";
import {emailWarningMsg, passwordMisMatchWarningMsg, passwordWarningMsg} from "../../../const/storageStrings";
import Required from "../../required/Required";

function SignUpBox({title, subtitle}) {
    const navigate = useNavigate()
    const [error, setError] = useState(normalVendorSignUpErrors)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const signUpUserHandler = async () => {
        const res = normalSignupVendorValidation(formData)
        setError(res)

        for (const key in res) {
            if (res[key]) {
                showError()
                return
            }
        }

        if (!EMAIL_REGEX.test(formData.email)) return toast.warning(emailWarningMsg, {
            icon: true,
            hideProgressBar: true
        })
        if (!PASSWORD_REGEX.test(formData.password)) return toast.warning(passwordWarningMsg, {
            icon: true,
            hideProgressBar: true
        })
        if (formData.password !== formData.confirmPassword) return toast.warning(passwordMisMatchWarningMsg, {
            icon: true,
            hideProgressBar: true
        })

        await signUpHandler()
    }

    const signUpHandler = async () => {

        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        const res = await vendorApi.signupVendor(data)
        if (res) {
            navigate('/login');
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
                                    <label className="label-text">Name<Required/></label>
                                    <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser/>
                                                </span>
                                        <Input className="form-control" type="text" name="text"
                                               placeholder="Name" value={formData.name}
                                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                                               invalid={error.name}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="input-box">
                                    <label className="label-text">Email<Required/></label>
                                    <div className="form-group">
                                                <span className="form-icon">
                                                    <FaRegEnvelope/>
                                                </span>
                                        <Input className="form-control" type="email" name="text"
                                               placeholder="Enter email" value={formData.email}
                                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                                               invalid={error.email}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="input-box">
                                    <label className="label-text">Password<Required/></label>
                                    <div className="form-group">
                                            <span className="form-icon">
                                                <FiLock/>
                                            </span>
                                        <Input className="form-control" type={showPassword ? "text" : "password"}
                                               name="text"
                                               placeholder="Password" value={formData.password}
                                               onChange={(e) => setFormData({...formData, password: e.target.value})}
                                               invalid={error.password}/>
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
                                    <label className="label-text">Confirm Password<Required/></label>
                                    <div className="form-group">
                                            <span className="form-icon">
                                                <FiLock/>
                                            </span>
                                        <Input className="form-control" type={showPassword ? "text" : "password"}
                                               name="text" placeholder="Confirm password"
                                               value={formData.confirmPassword} onChange={(e) => setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value
                                        })} invalid={error.confirmPassword}/>
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
                                    <button className="theme-btn border-0" onClick={signUpUserHandler}>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpBox;