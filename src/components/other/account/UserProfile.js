import React, {useEffect, useState} from 'react';
import {FiRefreshCw} from 'react-icons/fi'
import Breadcrumb from "../../common/Breadcrumb";
import GeneralHeader from "../../common/GeneralHeader";
import ScrollTopBtn from "../../common/ScrollTopBtn";
import Footer from "../../common/footer/Footer";
import PlaceGrid from "../../places/PlaceGrid";
import UserSidebar from "./UserSidebar";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {BsListCheck, BsPencil} from "react-icons/bs";
import ListingDetailsComments from "../../contact/ListingDetailsComments";
import {Button as ReactStrapBtn, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {MdStarBorder} from "react-icons/md";
import {AiOutlineUser} from "react-icons/ai";
import {FaRegEnvelope} from "react-icons/fa";
import Required from "../../required/Required";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {paymentStatus} from "../../../const/const";
import {reviewFormDataValidation} from "../../../utils/validations/validation";
import {showError} from "../../../utils/util";
import * as reviewApi from '../../../utils/api/review'
import * as vendorApi from '../../../utils/api/vendor'
import * as advertisementApi from '../../../utils/api/advertisement'
import {reviewFormDataErrors} from "../../../utils/validations/error";
import {useLocation} from "react-router-dom";

const states = {
    BreadcrumbImg: require('../../../assets/images/bread-bg.jpg')
}

function UserProfile() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const [reviewFormErrors, setReviewFormErrors] = useState(reviewFormDataErrors)
    const [isOpenReviewForm, setIsOpenReviewForm] = useState(false)
    const [reviewList, setReviewList] = useState([])
    const [userData, setUserData] = useState(null);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [advertisementsData, setAdvertisementsData] = useState({
        vendor: null,
        advertisementList: []
    })
    const [reviewFormData, setReviewFormData] = useState({
        vendorId: '',
        username: null,
        userEmail: null,
        reviewText: null,
        rating: 0
    })

    useEffect(() => {
        loadVendorDetails()
        loadAllVerifiedAds(1);
    }, []);

    const loadVendorDetails = async () => {
        const vendorId = queryParams.get('vendorId')
        setUserData(null)
        const res = await vendorApi.getVendorDetailsForUserProfile(vendorId)
        setUserData(res)
    }

    const loadAllVerifiedAds = async (pageNumber) => {
        const vendorId = queryParams.get('vendorId')
        const res = await advertisementApi.getAllAds(vendorId, paymentStatus[0], pageNumber, 2);
        if (res) {
            setAdvertisementsData(prevData => ({
                advertisementList: [...prevData.advertisementList, ...res.advertisements]
            }));
            setTotalPages(res.totalPages);
            setPage(res.currentPage)
        }
    }

    const loadAllReviewsForVendor = async () => {
        const vendorId = queryParams.get('vendorId')
        const res = await reviewApi.getAllReviewsForVendor(vendorId)
        setReviewList(res)
    }

    const addReviewHandler = async () => {
        const res = await reviewFormDataValidation(reviewFormData)
        setReviewFormErrors(res)

        for (const key in res) {
            if (res[key]) {
                showError()
                return
            }
        }

        await addReview()
    }

    const addReview = async () => {
        const data = {
            vendorId: reviewFormData.vendorId,
            userName: reviewFormData.username,
            userEmail: reviewFormData.userEmail,
            reviewText: reviewFormData.reviewText,
            rating: reviewFormData.rating
        }

        const res = await reviewApi.addReview(data)
        if (res) {
            setReviewList([])
            setReviewFormData({
                ...reviewFormData,
                username: null,
                userEmail: null,
                reviewText: null,
                rating: 0
            });
            setIsOpenReviewForm(false);
            await loadAllReviewsForVendor();
            await loadVendorDetails();
        }
    }

    const handleLoadMore = () => {
        if (page < totalPages) {
            loadAllVerifiedAds(page + 1);
        }
    }

    return (
        <main className="user-profile">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Vendor Profile" MenuPgTitle="Pages" img={states.BreadcrumbImg}/>

            <section className="user-profile-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="user-content">
                                <UserSidebar usercontent={userData}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <Tabs>
                                <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                                    <TabList className="nav nav-tabs border-0" id="nav-tab">
                                        <Tab onClick={() => loadAllVerifiedAds(1)}>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 me-1">
                                                <span className="la"><BsListCheck/></span> Listings
                                            </div>
                                        </Tab>
                                        <Tab onClick={loadAllReviewsForVendor}>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 me-1">
                                                <span className="la"><BsListCheck/></span> Reviews
                                            </div>
                                        </Tab>
                                    </TabList>
                                </div>
                                <div className="tab-content" id="nav-tabContent">
                                    <TabPanel>
                                        <h3 className="widget-title">{userData?.vendorName}'s
                                            Listings</h3>
                                        <div className="title-shape"></div>
                                        <div className="row two-clmn margin-top-35px">
                                            <PlaceGrid advertisementsData={advertisementsData}/>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="button-shared text-center">
                                                    <ReactStrapBtn className="theme-btn border-0 p-2 line-height-26"
                                                                   onClick={handleLoadMore}>
                                                        <span className={'me-1'}><FiRefreshCw/></span>
                                                        Load More Ads
                                                    </ReactStrapBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="comments-wrap">
                                            <Row>
                                                <Col className={'col-lg-6 col-md-6'}>
                                                    <h2 className="widget-title">
                                                        {reviewList.length} Reviews
                                                    </h2>
                                                </Col>
                                                <Col className={'col-lg-6 col-md-6 d-flex justify-content-end'}>
                                                    <ReactStrapBtn
                                                        className="border-0 theme-btn p-2 line-height-26"
                                                        onClick={() => setIsOpenReviewForm(!isOpenReviewForm)}>
                                                        <i className="d-inline-block"><MdStarBorder/></i>
                                                        Write A Review
                                                    </ReactStrapBtn>
                                                </Col>
                                            </Row>
                                            <div className="title-shape"></div>
                                            <ListingDetailsComments reviewLists={reviewList}/>
                                        </div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            {/*<NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />*/}

            {/* Footer */}
            <Footer/>

            <ScrollTopBtn/>

            <Modal isOpen={isOpenReviewForm}>
                <ModalHeader toggle={() => setIsOpenReviewForm(!isOpenReviewForm)}>Write a review</ModalHeader>
                <ModalBody>
                    <div className="contact-form-action">
                        <div className="input-box">
                            <label className="label-text">Name <Required/></label>
                            <div className="form-group">
                                <span className="la form-icon"><AiOutlineUser/></span>
                                <Input className="form-control" type="text" name="name" placeholder="Your Name"
                                       invalid={reviewFormErrors.username}
                                       onChange={(e) => setReviewFormData({
                                           ...reviewFormData,
                                           username: e.target.value
                                       })} value={reviewFormData.username}/>
                            </div>
                        </div>
                        <div className="input-box">
                            <label className="label-text">Email</label>
                            <div className="form-group">
                                <span className="la form-icon"><FaRegEnvelope/></span>
                                <Input className="form-control" type="email" name="email" placeholder="Email Address"
                                       onChange={(e) => setReviewFormData({
                                           ...reviewFormData,
                                           userEmail: e.target.value
                                       })}
                                       value={reviewFormData.userEmail}
                                />
                            </div>
                        </div>
                        <div className="input-box">
                            <label className="label-text">Review <Required/></label>
                            <div className="form-group">
                                <span className="la form-icon"><BsPencil/></span>
                                <Input className="message-control form-control" name="message" type={"textarea"}
                                       invalid={reviewFormErrors.reviewText}
                                       placeholder="Write Message" value={reviewFormData.reviewText}
                                       onChange={(e) => setReviewFormData({
                                           ...reviewFormData,
                                           reviewText: e.target.value
                                       })}/>
                            </div>
                        </div>
                        <div className={'input-box'}>
                            <label className='label-text'>Rating <Required/></label>
                            <div className="form-group">
                                <ReactStars
                                    count={5}
                                    size={35}
                                    value={reviewFormData.rating}
                                    onChange={(e) => setReviewFormData({...reviewFormData, rating: e})}
                                    activeColor={'#ffd700'}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ReactStrapBtn
                        className="border-0 button-success me-1 p-2 line-height-26" onClick={addReviewHandler}>
                        Add Review
                    </ReactStrapBtn>
                    <ReactStrapBtn
                        className="border-0 p-2 line-height-26" onClick={() => setIsOpenReviewForm(!isOpenReviewForm)}>
                        Cancel
                    </ReactStrapBtn>
                </ModalFooter>
            </Modal>

        </main>
    );
}

export default UserProfile;
