import React from 'react';
import {FiRefreshCw} from 'react-icons/fi'
import sectiondata from "../../../store/store";
import Breadcrumb from "../../common/Breadcrumb";
import Button from "../../common/Button";
import GeneralHeader from "../../common/GeneralHeader";
import ScrollTopBtn from "../../common/ScrollTopBtn";
import Footer from "../../common/footer/Footer";
import PlaceGrid from "../../places/PlaceGrid";
import UserSidebar from "./UserSidebar";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {BsListCheck} from "react-icons/bs";
import ListingDetailsComments from "../../contact/ListingDetailsComments";
import {Button as ReactStrapBtn, Col, Row} from "reactstrap";
import {MdStarBorder} from "react-icons/md";

const states = {
    BreadcrumbImg: require('../../../assets/images/bread-bg.jpg')
}

function UserProfile() {
    return (
        <main className="user-profile">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="User Profile" MenuPgTitle="Pages" img={states.BreadcrumbImg}/>

            <section className="user-profile-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="user-content">
                                <UserSidebar usercontent={sectiondata.userprofile.sidebar}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <Tabs>
                                <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                                    <TabList className="nav nav-tabs border-0" id="nav-tab">
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 me-1">
                                                <span className="la"><BsListCheck/></span> Listings
                                            </div>
                                        </Tab>
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 me-1">
                                                <span className="la"><BsListCheck/></span> Reviews
                                            </div>
                                        </Tab>
                                    </TabList>
                                </div>
                                <div className="tab-content" id="nav-tabContent">
                                    <TabPanel>
                                        <h3 className="widget-title">{sectiondata.userprofile.sidebar.name}'s
                                            Listings</h3>
                                        <div className="title-shape"></div>
                                        <div className="row two-clmn margin-top-35px">
                                            <PlaceGrid griditems={sectiondata.placesgrid}/>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="button-shared text-center">
                                                    <Button text="load more listing" url="#" className="border-0">
                                                        <span><FiRefreshCw/></span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="comments-wrap">
                                            <Row>
                                                <Col className={'col-lg-6 col-md-6'}>
                                                    <h2 className="widget-title">
                                                        3 Reviews
                                                    </h2>
                                                </Col>
                                                <Col className={'col-lg-6 col-md-6 d-flex justify-content-end'}>
                                                    <ReactStrapBtn
                                                        className="border-0 theme-btn p-2 line-height-26">
                                                        <i className="d-inline-block"><MdStarBorder/></i>
                                                        Write A Review
                                                    </ReactStrapBtn>
                                                </Col>
                                            </Row>
                                            <div className="title-shape"></div>
                                            <ListingDetailsComments commentlists={sectiondata.listingDetails.comments}/>
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

        </main>
    );
}

export default UserProfile;
