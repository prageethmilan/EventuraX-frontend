import React, {useEffect, useState} from 'react';
import {
    AiOutlineExclamationCircle,
    AiOutlinePlusCircle,
    AiOutlinePoweroff,
    AiOutlineUser,
    AiOutlineYoutube
} from 'react-icons/ai';
import {BsListCheck, BsPencil} from 'react-icons/bs';
import {FaGlobeAmericas, FaRegEnvelope} from 'react-icons/fa';
import {FiEdit, FiEye, FiEyeOff, FiPhone} from 'react-icons/fi';
import {GiPositionMarker} from 'react-icons/gi';
import {Link} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Breadcrumb from "../../components/common/Breadcrumb";
// import Button from "../../components/common/Button";
import GeneralHeader from "../../components/common/GeneralHeader";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import Footer from "../../components/common/footer/Footer";
import sectiondata from "../../store/store";
import {Button, Input} from "reactstrap";
import Cookies from "js-cookie";
import {ACCESS_TOKEN, VENDOR} from "../../const/const";
import {PASSWORD_REGEX, updatePasswordValidation} from "../../utils/validations/validation";
import {toast} from "react-toastify";
import {passwordMisMatchWarningMsg, passwordWarningMsg} from "../../const/storageStrings";
import {updatePasswordErrors} from "../../utils/validations/error";
import {showError} from "../../utils/util";
import * as vendorApi from '../../utils/api/vendor'


function Dashboard() {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState(updatePasswordErrors);
    const [changePasswordFormData, setChangePasswordFormData] = useState({
        vendorId: JSON.parse(Cookies.get(VENDOR)).id,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const body = document.querySelector('body')

        function showDeleteAcntModal(e) {
            body.classList.add('modal-open')
            body.style.paddingRight = '17px'
            e.preventDefault()
        }

        document.addEventListener('click', function (e) {
                for (
                    let target = e.target;
                    target && target !== this;
                    target = target.parentNode
                ) {
                    if (target.matches('.delete-account-info .delete-account, .card-item .card-content-wrap .delete-btn')) {
                        showDeleteAcntModal.call(target, e)
                        break
                    }
                }
            }, false
        )

        function hideDeleteAcntModal(e) {
            body.classList.remove('modal-open')
            body.style.paddingRight = '0'
            e.preventDefault()
        }

        document.addEventListener('click', function (e) {
                for (
                    let target = e.target;
                    target && target !== this;
                    target = target.parentNode
                ) {
                    if (target.matches('.account-delete-modal .modal-bg, .account-delete-modal .modal-dialog .btn-box .theme-btn')) {
                        hideDeleteAcntModal.call(target, e)
                        break
                    }
                }
            }, false
        )
    })

    const handleUpdatePassword = async () => {
        const res = updatePasswordValidation(changePasswordFormData)
        setError(res)

        for (const key in res) {
            if (res[key]) {
                showError()
                return
            }
        }


        if (!PASSWORD_REGEX.test(changePasswordFormData.currentPassword) || !PASSWORD_REGEX.test(changePasswordFormData.newPassword)) return toast.warning(passwordWarningMsg, {
            icon: true,
            hideProgressBar: true
        })
        if (changePasswordFormData.newPassword !== changePasswordFormData.confirmPassword) return toast.warning(passwordMisMatchWarningMsg, {
            icon: true,
            hideProgressBar: true
        })

        await updatePasswordHandler()
    }

    const updatePasswordHandler = async () => {
        const data = {
            vendorId: changePasswordFormData.vendorId,
            currentPassword: changePasswordFormData.currentPassword,
            newPassword: changePasswordFormData.newPassword
        }

        const res = await vendorApi.updatePassword(data)
        if (res) setChangePasswordFormData({
            ...changePasswordFormData,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handleSignOutHandler = () => {
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(VENDOR);
        window.location.href = "/login";
    }

    return (
        <main className="dashboard-page">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Dashboard" MenuPgTitle="pages" img={sectiondata.dashboard.breadcrumbimg}/>

            {/*<TestVanillaJs />*/}

            <section className="dashboard-area padding-top-40px padding-bottom-90px">
                <div className="container">
                    <Tabs>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                                    <TabList className="nav nav-tabs border-0" id="nav-tab">
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 me-1">
                                                <span className="la"><BsListCheck/></span> Listings
                                            </div>
                                        </Tab>
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 me-1">
                                                <span className="la"><AiOutlineUser/></span> Profile
                                            </div>
                                        </Tab>
                                    </TabList>
                                    <div className="btn-box">
                                        <Link to="/add-listing/new" className="theme-btn"><span
                                            className="la"><AiOutlinePlusCircle/></span> create listing</Link>
                                        <Link to={'#'} className="theme-btn ms-1"
                                              onClick={handleSignOutHandler}><span
                                            className="la"><AiOutlinePoweroff/></span> sign out</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="tab-content" id="nav-tabContent">
                                    <TabPanel>
                                        <div className="row">

                                            {sectiondata.dashboard.cards.map((item, i) => {
                                                return (
                                                    <div key={i} className="col-lg-4 column-td-6">
                                                        <div className="card-item">
                                                            <Link to={item.cardLink} className="card-image-wrap">
                                                                <div className="card-image">
                                                                    <img src={item.img} className="card__img"
                                                                         alt="Card"/>
                                                                </div>
                                                            </Link>
                                                            <div className="card-content-wrap">
                                                                <div className="card-content">
                                                                    <Link to={item.cardLink}>
                                                                        <h4 className="card-title mt-0">{item.title}</h4>
                                                                        <p className="card-sub">{item.subtitle}</p>
                                                                    </Link>
                                                                </div>
                                                                <div className="rating-row">
                                                                    <div className="edit-info-box">
                                                                        <button type="button"
                                                                                className="theme-btn button-success border-0 me-1">
                                                                            <span
                                                                                className="la">{item.editIcon}</span> {item.editTxt}
                                                                        </button>
                                                                        <button type="button"
                                                                                className="theme-btn delete-btn border-0"
                                                                                data-toggle="modal"
                                                                                data-target=".product-delete-modal">
                                                                            <span
                                                                                className="la">{item.deleteIcon}</span> {item.deleteTxt}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="user-profile-action">
                                                    <div className="user-pro-img mb-4">
                                                        <img src={sectiondata.dashboard.userImg} alt="user"/>
                                                        <div className="dropdown edit-btn">
                                                            <button
                                                                className="theme-btn edit-btn dropdown-toggle border-0 after-none"
                                                                type="button" id="editImageMenu"
                                                                data-toggle="dropdown" aria-haspopup="true">
                                                                <i className="la la-photo"></i> Edit
                                                            </button>
                                                            <div className="dropdown-menu"
                                                                 aria-labelledby="editImageMenu">
                                                                <div className="upload-btn-box">
                                                                    <form>
                                                                        <input type="file" name="files[]"
                                                                               id="filer_input" multiple="multiple"/>
                                                                        <button
                                                                            className="theme-btn border-0 w-100 button-success"
                                                                            type="submit" value="submit">
                                                                            Save changes
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                                <div className="btn-box mt-3">
                                                                    <button className="theme-btn border-0 w-100">Remove
                                                                        Photo
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-details">
                                                        <h2 className="user__name widget-title pb-2">
                                                            {sectiondata.dashboard.userName}
                                                        </h2>
                                                        <div className="section-heading">
                                                            <p className="sec__desc font-size-15 line-height-24">
                                                                {sectiondata.dashboard.userbio}
                                                            </p>
                                                        </div>
                                                        <ul className="list-items mt-3">
                                                            <li>
                                                                <span className="la d-inline-block"><GiPositionMarker/></span> {sectiondata.dashboard.address}
                                                            </li>
                                                            <li className="text-lowercase">
                                                                <span
                                                                    className="la d-inline-block"><FiPhone/></span> {sectiondata.dashboard.phoneNum}
                                                            </li>
                                                            <li className="text-lowercase">
                                                                <span
                                                                    className="la d-inline-block"><FaGlobeAmericas/></span> {sectiondata.dashboard.website}
                                                            </li>
                                                        </ul>
                                                        <div className="user-edit-form mt-4">
                                                            <div className={isOpenForm ? 'dropdown show' : 'dropdown'}>
                                                                <button
                                                                    className="theme-btn edit-form-btn shadow-none w-100 dropdown-toggle after-none"
                                                                    type="button"
                                                                    onClick={() => setIsOpenForm(!isOpenForm)}>
                                                                    <i className="la"><FiEdit/></i> Edit
                                                                </button>
                                                                <div
                                                                    className={isOpenForm ? 'dropdown-menu show' : 'dropdown-menu'}>
                                                                    <div className="contact-form-action">
                                                                        <div className="input-box">
                                                                            <label className="label-text">Name</label>
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><AiOutlineUser/></span>
                                                                                <input className="form-control"
                                                                                       type="text" name="name"
                                                                                       placeholder="Enter your name"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <label className="label-text">Bio
                                                                                Data</label>
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><BsPencil/></span>
                                                                                <textarea
                                                                                    className="message-control form-control"
                                                                                    name="message"
                                                                                    placeholder="Add a bio"></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><GiPositionMarker/></span>
                                                                                <input className="form-control"
                                                                                       type="text" name="location"
                                                                                       placeholder="Location"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><FiPhone/></span>
                                                                                <input className="form-control"
                                                                                       type="text" name="number"
                                                                                       placeholder="Number"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><FaRegEnvelope/></span>
                                                                                <input className="form-control"
                                                                                       type="email" name="email"
                                                                                       placeholder="Email Address"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><AiOutlineYoutube/></span>
                                                                                <input className="form-control"
                                                                                       type="text" name="youtube"
                                                                                       placeholder="Youtube URL"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span
                                                                                    className="la form-icon"><FaGlobeAmericas/></span>
                                                                                <input className="form-control"
                                                                                       type="text" name="website"
                                                                                       placeholder="Website"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="btn-box">
                                                                            <button type="button"
                                                                                    className="theme-btn border-0 button-success me-1">
                                                                                save changes
                                                                            </button>
                                                                            <button type="button"
                                                                                    className="theme-btn border-0">
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="user-form-action">
                                                    <div className="billing-form-item">
                                                        <div className="billing-title-wrap">
                                                            <h3 className="widget-title pb-0">Change Password</h3>
                                                            <div className="title-shape margin-top-10px"></div>
                                                        </div>
                                                        <div className="billing-content">
                                                            <div className="contact-form-action">
                                                                <div className="input-box">
                                                                    <label className="label-text">Current
                                                                        Password</label>
                                                                    <div className="form-group">
                                                                        <span
                                                                            className="la form-icon"><BsPencil/></span>
                                                                        <Input className="form-control"
                                                                               type={showPassword ? "text" : "password"}
                                                                               name="text"
                                                                               placeholder="Current Password"
                                                                               value={changePasswordFormData.currentPassword}
                                                                               invalid={error.currentPassword}
                                                                               onChange={(e) => setChangePasswordFormData({
                                                                                   ...changePasswordFormData,
                                                                                   currentPassword: e.target.value
                                                                               })}/>
                                                                        <span
                                                                            className="eye-icon"
                                                                            onClick={handleShowPassword}
                                                                            style={{cursor: 'pointer'}}
                                                                        >
                                                                            {showPassword ? <FiEyeOff/> : <FiEye/>}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="input-box">
                                                                    <label className="label-text">New Password</label>
                                                                    <div className="form-group">
                                                                        <span
                                                                            className="la form-icon"><BsPencil/></span>
                                                                        <Input className="form-control"
                                                                               type={showPassword ? "text" : "password"}
                                                                               name="text" placeholder="New Password"
                                                                               value={changePasswordFormData.newPassword}
                                                                               invalid={error.newPassword}
                                                                               onChange={(e) => setChangePasswordFormData({
                                                                                   ...changePasswordFormData,
                                                                                   newPassword: e.target.value
                                                                               })}/>
                                                                        <span
                                                                            className="eye-icon"
                                                                            onClick={handleShowPassword}
                                                                            style={{cursor: 'pointer'}}
                                                                        >
                                                                            {showPassword ? <FiEyeOff/> : <FiEye/>}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="input-box">
                                                                    <label className="label-text">Confirm New
                                                                        Password</label>
                                                                    <div className="form-group">
                                                                        <span
                                                                            className="la form-icon"><BsPencil/></span>
                                                                        <Input className="form-control"
                                                                               type={showPassword ? "text" : "password"}
                                                                               name="text"
                                                                               placeholder="Confirm New Password"
                                                                               value={changePasswordFormData.confirmPassword}
                                                                               invalid={error.confirmPassword}
                                                                               onChange={(e) => setChangePasswordFormData({
                                                                                   ...changePasswordFormData,
                                                                                   confirmPassword: e.target.value
                                                                               })}/>
                                                                        <span
                                                                            className="eye-icon"
                                                                            onClick={handleShowPassword}
                                                                            style={{cursor: 'pointer'}}
                                                                        >
                                                                            {showPassword ? <FiEyeOff/> : <FiEye/>}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="btn-box">
                                                                    <Button
                                                                        className="button-success border-0"
                                                                        onClick={handleUpdatePassword}>
                                                                        Update Password
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>

            {/* Newsletter */}
            {/*<NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />*/}

            {/* Footer */}
            <Footer/>

            <ScrollTopBtn/>


            {/* Modal */}
            <div className="modal-form text-center">
                <div className="modal fade account-delete-modal" tabIndex="-1" role="dialog"
                     aria-labelledby="mySmallModalLabel">
                    <div className="modal-bg"></div>
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content p-4">
                            <div className="modal-top border-0 mb-4 p-0">
                                <div className="alert-content">
                                    <span className="la warning-icon"><AiOutlineExclamationCircle/></span>
                                    <h4 className="modal-title mt-2 mb-1">Your account will be deleted permanently!</h4>
                                    <p className="modal-sub">Are you sure to proceed.</p>
                                </div>
                            </div>
                            <div className="btn-box">
                                <button type="button" className="theme-btn border-0 button-success me-1"
                                        data-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="button" className="theme-btn border-0 button-danger">
                                    delete!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
