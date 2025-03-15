import React, {useEffect, useState} from 'react';
import {AiOutlinePlusCircle, AiOutlinePoweroff, AiOutlineUser} from 'react-icons/ai';
import {BsListCheck, BsPencil} from 'react-icons/bs';
import {FaDollarSign, FaGlobeAmericas, FaRegEdit, FaRegEnvelope, FaRegTrashAlt} from 'react-icons/fa';
import {FiEdit, FiEye, FiEyeOff, FiPhone} from 'react-icons/fi';
import {GiPositionMarker} from 'react-icons/gi';
import {Link, useNavigate} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Breadcrumb from "../../components/common/Breadcrumb";
// import Button from "../../components/common/Button";
import GeneralHeader from "../../components/common/GeneralHeader";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import Footer from "../../components/common/footer/Footer";
import sectiondata from "../../store/store";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Cookies from "js-cookie";
import {ACCESS_TOKEN, allowedLogoTypes, VENDOR} from "../../const/const";
import {
    EMAIL_REGEX,
    PASSWORD_REGEX,
    updatePasswordValidation,
    updateVendorFormValidation
} from "../../utils/validations/validation";
import {toast} from "react-toastify";
import {emailWarningMsg, passwordMisMatchWarningMsg, passwordWarningMsg} from "../../const/storageStrings";
import {updatePasswordErrors, updateVendorFormErrors} from "../../utils/validations/error";
import {findObject, showError} from "../../utils/util";
import * as vendorApi from '../../utils/api/vendor'
import Select from "react-select";
import {categories, locations} from "../../const/dropdownData";
import Required from "../../components/required/Required";
import * as advertisementApi from '../../utils/api/advertisement'
import ConfirmBox from "../../components/confirm-box";
import {HelpCircle} from "react-feather";


function Dashboard() {
    const navigate = useNavigate();
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [isOpenLogoForm, setIsOpenLogoForm] = useState(false)
    const [isOpenConfirmBox, setIsOpenConfirmBox] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const [logo, setLogo] = useState(null)
    const [error, setError] = useState(updatePasswordErrors);
    const [vendorError, setVendorError] = useState(updateVendorFormErrors)
    const [advertisementList, setAdvertisementList] = useState([])
    const [vendorObj, setVendorObj] = useState(null)
    const [advertisementId, setAdvertisementId] = useState('')
    const [changePasswordFormData, setChangePasswordFormData] = useState({
        vendorId: Cookies.get(VENDOR) !== undefined ? JSON.parse(Cookies.get(VENDOR)).id : 0,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [vendorFormData, setVendorFormData] = useState({
        name: undefined,
        email: undefined,
        mobileNumber: undefined,
        website: null,
        location: undefined,
        address: undefined,
        description: undefined
    })
    const [displayVendorData, setDisplayVendorData] = useState({
        logo: null,
        name: null,
        description: null,
        mobileNumber: null,
        website: null,
        address: null
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        loadAllAdvertisements()
    }, [])

    const loadAllAdvertisements = async () => {
        const res = await advertisementApi.getAllAdsForDashboard(JSON.parse(Cookies.get(VENDOR))?.id)
        if (res && res.length !== 0) {
            setAdvertisementList(res.advertisements)
            setVendorObj(res.vendor)
        }
    }

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

    const getVendorDetailsHandler = async () => {
        const res = await vendorApi.getVendorDetails(JSON.parse(Cookies.get(VENDOR)).id);
        if (res) {
            setVendorFormData({
                ...vendorFormData,
                name: res.name,
                email: res.email,
                mobileNumber: res.mobileNumber,
                website: res.website,
                location: findObject(locations, res.location),
                address: res.address,
                description: res.description
            })
            setDisplayVendorData({
                ...displayVendorData,
                logo: res.logo,
                name: res.name,
                description: res.description,
                mobileNumber: res.mobileNumber,
                website: res.website,
                address: res.address
            })
        }
    }

    const updateVendorHandler = async () => {
        const res = updateVendorFormValidation(vendorFormData)
        setVendorError(res)
        for (const key in res) {
            if (res[key]) {
                showError()
                return
            }
        }

        if (!EMAIL_REGEX.test(vendorFormData.email)) toast.warning(emailWarningMsg, {icon: true, hideProgressBar: true})

        await updateVendorDetails()
    }

    const updateVendorDetails = async () => {

        const data = {
            name: vendorFormData.name,
            email: vendorFormData.email,
            mobileNumber: vendorFormData.mobileNumber,
            website: vendorFormData.website,
            location: vendorFormData.location.value,
            description: vendorFormData.description,
            address: vendorFormData.address
        }

        const res = await vendorApi.updateVendor(JSON.parse(Cookies.get(VENDOR)).id, data)
        if (res) {
            setIsOpenForm(false)
            const vendor = {
                id: res._id,
                email: res.email,
                name: res.name,
                socialId: res.socialId,
                isVerified: res.verified
            }
            Cookies.set(VENDOR, JSON.stringify(vendor))
            setVendorFormData({
                ...vendorFormData,
                name: res.name,
                email: res.email,
                mobileNumber: res.mobileNumber,
                website: res.website,
                location: findObject(locations, res.location),
                address: res.address,
                description: res.description
            })
            setDisplayVendorData({
                ...displayVendorData,
                name: res.name,
                description: res.description,
                mobileNumber: res.mobileNumber,
                website: res.website,
                address: res.address
            })
        }
    }
    const handleLogoUpdate = async () => {
        if (!logo) return toast.error("Please select a image", {icon: true, hideProgressBar: true})
        if (!allowedLogoTypes.includes(logo.type)) {
            return toast.error("Only JPG, PNG, GIF, and WebP images are allowed!", {icon: true, hideProgressBar: true})
        }

        const response = await vendorApi.updateVendorLogo(JSON.parse(Cookies.get(VENDOR)).id, logo)
        if (response) {
            setIsOpenLogoForm(false)
            setDisplayVendorData({...displayVendorData, logo: response.logo})
        }
    }

    const handleEditAdvertisement = (item) => {
        navigate('/edit-listing', {
            state: {
                ...item,
                vendorName: vendorObj?.name,
                vendorEmail: vendorObj?.email,
                vendorMobileNumber: vendorObj?.mobileNumber
            }
        });
    }

    const handlePaymentProcess = (item) => {
        navigate('/listing-confirmation', {
            state: {
                vendor: {
                    name: vendorObj?.name,
                    email: vendorObj?.email,
                    mobileNumber: vendorObj?.mobileNumber
                },
                advertisement: item
            }
        })
    }

    const handleDeleteAdvertisement = (item) => {
        setIsOpenConfirmBox(true)
        setAdvertisementId(item._id)
    }

    const onDeleteAdvertisement = async () => {
        const res = await advertisementApi.deleteAdvertisement(advertisementId)
        if (res) {
            setIsOpenConfirmBox(false)
            setAdvertisementId('')
            loadAllAdvertisements()
        }
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
                                        <Tab onClick={getVendorDetailsHandler}>
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

                                            {advertisementList.map((item, i) => {
                                                return (
                                                    <div key={i} className="col-lg-4 column-td-6">
                                                        <div className="card-item">
                                                            <Link to={`#`}
                                                                  className="card-image-wrap">
                                                                <div className="card-image">
                                                                    <img src={item.images[0]} className="card__img"
                                                                         alt="Card"/>
                                                                </div>
                                                            </Link>
                                                            <div className="card-content-wrap">
                                                                <div className="card-content">
                                                                    <Link to={'#'}>
                                                                        <h4 className="card-title mt-0">{item.title}</h4>
                                                                        <p className="card-sub">{findObject(categories, item?.category)?.label}</p>
                                                                    </Link>
                                                                </div>
                                                                <div className="rating-row">
                                                                    <div className="edit-info-box">
                                                                        <button type="button"
                                                                                className="theme-btn button-success border-0 me-1"
                                                                                onClick={() => handleEditAdvertisement(item)}>
                                                                            <span
                                                                                className="la"><FaRegEdit/></span> Edit
                                                                        </button>
                                                                        {
                                                                            item?.paymentStatus === "PENDING" &&
                                                                            <button type="button"
                                                                                    className="theme-btn button-success border-0 me-1"
                                                                                    onClick={() => handlePaymentProcess(item)}>
                                                                            <span
                                                                                className="la"><FaDollarSign/></span> Payment
                                                                            </button>
                                                                        }
                                                                        <button type="button"
                                                                                className="theme-btn delete-btn border-0"
                                                                                data-toggle="modal"
                                                                                data-target=".product-delete-modal"
                                                                                onClick={() => handleDeleteAdvertisement(item)}>
                                                                            <span
                                                                                className="la"><FaRegTrashAlt/></span> Delete
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
                                                        <img
                                                            src={displayVendorData.logo ? displayVendorData.logo : sectiondata.dashboard.userImg}
                                                            alt="user"/>
                                                        <div className="dropdown edit-btn">
                                                            <button onClick={() => setIsOpenLogoForm(!isOpenLogoForm)}
                                                                    className="theme-btn edit-btn dropdown-toggle border-0 after-none"
                                                                    type="button" id="editImageMenu"
                                                                    data-toggle="dropdown" aria-haspopup="true">
                                                                <i className="la la-photo"></i> Edit
                                                            </button>
                                                            {isOpenLogoForm && <div className="dropdown-menu d-block"
                                                                                    aria-labelledby="editImageMenu">
                                                                <div className="upload-btn-box">
                                                                    <Input className={'mb-4'} type="file" name="files"
                                                                        // value={logo}
                                                                           accept={"image/"}
                                                                           onChange={(e) => setLogo(e.target.files[0])}
                                                                           id="filer_input"/>
                                                                    <button
                                                                        className="theme-btn border-0 w-100 button-success"
                                                                        onClick={handleLogoUpdate}>
                                                                        Save changes
                                                                    </button>
                                                                </div>
                                                                <div className="btn-box mt-3">
                                                                    <button className="theme-btn border-0 w-100">Remove
                                                                        Photo
                                                                    </button>
                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                    <div className="user-details">
                                                        <h2 className="user__name widget-title pb-2">
                                                            {displayVendorData.name}
                                                        </h2>
                                                        {displayVendorData.description &&
                                                            <div className="section-heading">
                                                                <p className="sec__desc font-size-15 line-height-24">
                                                                    {displayVendorData.description}
                                                                </p>
                                                            </div>}
                                                        <ul className="list-items mt-3">
                                                            {displayVendorData.address && <li>
                                                                <span className="la d-inline-block"><GiPositionMarker/></span> {displayVendorData.address}
                                                            </li>}
                                                            {displayVendorData.mobileNumber &&
                                                                <li className="text-lowercase">
                                                                <span
                                                                    className="la d-inline-block"><FiPhone/></span> {displayVendorData.mobileNumber}
                                                                </li>}
                                                            {displayVendorData.website &&
                                                                <li className="text-lowercase">
                                                                <span
                                                                    className="la d-inline-block"><FaGlobeAmericas/></span> {displayVendorData.website}
                                                                </li>}
                                                        </ul>
                                                        <div className="user-edit-form mt-4">
                                                            <div className={isOpenForm ? 'dropdown show' : 'dropdown'}>
                                                                <button
                                                                    className="theme-btn edit-form-btn shadow-none w-100 dropdown-toggle after-none"
                                                                    type="button"
                                                                    onClick={() => setIsOpenForm(!isOpenForm)}>
                                                                    <i className="la"><FiEdit/></i> Edit
                                                                </button>
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
                                                                        Password<Required/></label>
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
                                                                    <label className="label-text">New
                                                                        Password<Required/></label>
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
                                                                        Password<Required/></label>
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

            <Modal isOpen={isOpenForm}>
                <ModalHeader toggle={() => setIsOpenForm(!isOpenForm)}>Update Profile</ModalHeader>
                <ModalBody>
                    <div className="contact-form-action">
                        <div className="input-box">
                            <label className="label-text">Name<Required/></label>
                            <div className="form-group">
                                        <span
                                            className="la form-icon"><AiOutlineUser/></span>
                                <Input className="form-control"
                                       type="text" name="name"
                                       invalid={vendorError.name}
                                       value={vendorFormData.name}
                                       onChange={(e) => setVendorFormData({...vendorFormData, name: e.target.value})}
                                       placeholder="Enter your name"/>
                            </div>
                        </div>
                        <div className="input-box">
                            <label className="label-text">Bio
                                Data<Required/></label>
                            <div className="form-group">
                                            <span
                                                className="la form-icon"><BsPencil/></span>
                                <Input
                                    className="message-control form-control"
                                    name="message"
                                    type={'textarea'}
                                    invalid={vendorError.description}
                                    value={vendorFormData.description}
                                    onChange={(e) => setVendorFormData({
                                        ...vendorFormData,
                                        description: e.target.value
                                    })}
                                    placeholder="Add a bio"/>
                            </div>
                        </div>
                        <div className="input-box">
                            <label
                                className="label-text">Location<Required/></label>
                            <div className="form-group">
                                            <span
                                                className="la form-icon"><GiPositionMarker/></span>
                                <Select
                                    placeholder="Select a Location"
                                    value={vendorFormData.location}
                                    className={vendorError.location ? 'is-invalid' : ''}
                                    options={locations}
                                    onChange={(e) => setVendorFormData({...vendorFormData, location: e})}
                                />
                            </div>
                        </div>
                        <div className="input-box">
                            <label
                                className="label-text">Address<Required/></label>
                            <div className="form-group">
                                            <span
                                                className="la form-icon"><GiPositionMarker/></span>
                                <Input className="form-control"
                                       type="text" name="address"
                                       placeholder="Address"
                                       invalid={vendorError.address}
                                       value={vendorFormData.address}
                                       onChange={(e) => setVendorFormData({
                                           ...vendorFormData,
                                           address: e.target.value
                                       })}
                                />
                            </div>
                        </div>
                        <div className="input-box">
                            <label
                                className="label-text">Mobile Number<Required/></label>
                            <div className="form-group">
                                            <span
                                                className="la form-icon"><FiPhone/></span>
                                <Input className="form-control"
                                       type="text" name="mobileNumber"
                                       placeholder="Mobile Number"
                                       invalid={vendorError.mobileNumber}
                                       value={vendorFormData.mobileNumber}
                                       maxLength={10}
                                       onKeyDown={(e) => {
                                           if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                               e.preventDefault();
                                           }
                                       }}
                                       onChange={(e) => {
                                           console.log(e.target.value)
                                           setVendorFormData({
                                               ...vendorFormData,
                                               mobileNumber: e.target.value
                                           })
                                       }}
                                />
                            </div>
                        </div>
                        <div className="input-box">
                            <label
                                className="label-text">Email<Required/></label>
                            <div className="form-group">
                                            <span
                                                className="la form-icon"><FaRegEnvelope/></span>
                                <Input className="form-control"
                                       type="email" name="email"
                                       value={vendorFormData.email}
                                       invalid={vendorError.email}
                                       onChange={(e) => setVendorFormData({...vendorFormData, email: e.target.value})}
                                       placeholder="Email Address"/>
                            </div>
                        </div>
                        <div className="input-box">
                            <div className="form-group">
                                            <span
                                                className="la form-icon"><FaGlobeAmericas/></span>
                                <Input className="form-control"
                                       type="text" name="website"
                                       value={vendorFormData.website}
                                       onChange={(e) => setVendorFormData({...vendorFormData, website: e.target.value})}
                                       placeholder="Website"/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="border-0 button-success me-1" onClick={updateVendorHandler}>
                        Save Changes
                    </Button>
                    <Button
                        className="border-0" onClick={() => setIsOpenForm(!isOpenForm)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            {isOpenConfirmBox && <ConfirmBox
                isOpen={isOpenConfirmBox}
                toggleModal={() => {
                    setIsOpenConfirmBox(false)
                    setAdvertisementId('')
                }}
                yesBtnClick={onDeleteAdvertisement}
                noBtnClick={() => {
                    setIsOpenConfirmBox(false)
                    setAdvertisementId('')
                }}
                title={'Warning'}
                message={'Are you sure you want to delete this advertisement?'}
                yesBtn="Delete"
                noBtn="Cancel"
                icon={<HelpCircle size={60} color="#EA5455"/>}
            />}
        </main>
    );
}

export default Dashboard;
