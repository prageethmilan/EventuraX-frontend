import React, {useEffect, useState} from 'react';
import {FiRefreshCw} from "react-icons/fi";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import ListingListSidebar from "../../components/sidebars/ListingListSidebar";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import GenericHeader from "../../components/common/GenericHeader";
import breadcrumbimg from '../../assets/images/advertisements_bg.png'
import PlaceGrid from "../../components/places/PlaceGrid";
import {useLocation} from "react-router-dom";
import * as advertisementApi from "../../utils/api/advertisement";
import {Col, Row} from 'reactstrap';

const states = {
    breadcrumbimg: breadcrumbimg,
}

function ListLeftSidebar() {
    const location = useLocation();
    const {state} = location
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [searchData, setSearchData] = useState({
        keyword: null,
        location: null,
        category: null,
        minPrice: 0,
        maxPrice: null,
        maxRating: null
    })
    const [advertisementsData, setAdvertisementsData] = useState({
        advertisementList: []
    })
    const [recommendedAdvertisementsData, setRecommendedAdvertisementData] = useState({
        advertisementList: []
    })

    useEffect(() => {
        const fetchData = async () => {
            if (state?.keyword || state?.location || state?.category || state?.page || state?.totalPages) {
                setSearchData(prevState => ({
                    ...prevState,
                    keyword: state?.keyword || null,
                    location: state?.location || null,
                    category: state?.category || null
                }))
            }
            if (state) {
                setAdvertisementsData({advertisementList: state?.data?.advertisements ? state?.data?.advertisements : []})
                setPage(state?.page)
                setTotalPages(state?.totalPages)
                setTotalElements(state?.totalElements)
            } else {
                await loadRecommendedAdvertisements()
                await loadAllAdvertisements(1)
            }
        }

        fetchData();

        return () => {
        }
    }, []);

    const loadRecommendedAdvertisements = async () => {
        setRecommendedAdvertisementData({advertisementList: []})
        const res = await advertisementApi.getRecommendedAdvertisements(searchData.location, searchData.category)
        if (res && res.advertisements.length !== 0) {
            setRecommendedAdvertisementData(prevData => ({
                advertisementList: [...prevData.advertisementList, ...res.advertisements]
            }));
        }
    }

    const loadAllAdvertisements = async (pageNumber) => {
        setAdvertisementsData({advertisementList: []})
        const res = await advertisementApi.getFilteredAdvertisements(pageNumber, 5, searchData.keyword, searchData.location, searchData.category, searchData.minPrice, searchData.maxPrice, searchData.maxRating)
        if (res && res.advertisements.length !== 0) {
            setAdvertisementsData(prevData => ({
                advertisementList: [...prevData.advertisementList, ...res.advertisements]
            }));
            setTotalPages(res.totalPages);
            setPage(res.currentPage)
            setTotalElements(res.totalElements)
        }
    }

    const filterChangeHandler = async (name, data) => {
        await setSearchData(prevState => ({
            ...prevState,
            [name]: data
        }))
    }

    const handleLoadMore = async () => {
        if (page < totalPages) {
            await loadAllAdvertisements(page + 1);
        }
    }


    return (
        <main className="list-left-sidebar">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Advertisements" img={states.breadcrumbimg}/>

            {/* Place List */}
            <section className="card-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-lg-12">
                            <GenericHeader onChangeHandler={filterChangeHandler} data={searchData}
                                           advertisements={advertisementsData.advertisementList}
                                           totalElements={totalElements}/>
                        </div>

                        <div className="col-lg-4">
                            <ListingListSidebar onFilterChangeHandler={filterChangeHandler}
                                                onApplyFilters={async () => {
                                                    await loadAllAdvertisements(1)
                                                    await loadRecommendedAdvertisements()
                                                }} data={searchData}/>
                        </div>

                        <div className="col-lg-8 row align-items-start">
                            {((state === null || state === undefined) && recommendedAdvertisementsData.advertisementList.length > 0) &&
                                <Row>
                                    <Col lg={12} md={12} xs={12} className={'mb-2'}>
                                        <h2 className="widget-title">
                                            Recommended Advertisements
                                        </h2>
                                        <div className="title-shape"></div>
                                    </Col>
                                    <PlaceGrid advertisementsData={recommendedAdvertisementsData}/>
                                </Row>}
                            <Row>
                                <Col lg={12} md={12} xs={12} className={'mb-2'}>
                                    <h2 className="widget-title">
                                        Advertisements
                                    </h2>
                                    <div className="title-shape"></div>
                                </Col>
                                <PlaceGrid advertisementsData={advertisementsData}/>
                            </Row>
                        </div>
                    </div>
                    {(page < totalPages) && <div className="row">
                        <div className="col-lg-12">
                            <div className="button-shared text-center">
                                <button className="theme-btn border-0" onClick={handleLoadMore}>
                                    <span className="d-inline-block me-1">
                                        <FiRefreshCw/>
                                    </span>
                                    Load More Ads
                                </button>
                            </div>
                        </div>
                    </div>}
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

export default ListLeftSidebar;
