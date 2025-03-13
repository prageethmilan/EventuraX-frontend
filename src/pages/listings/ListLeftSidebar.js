import React, {useEffect, useState} from 'react';
import {FiRefreshCw} from "react-icons/fi";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import ListingListSidebar from "../../components/sidebars/ListingListSidebar";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import GenericHeader from "../../components/common/GenericHeader";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import PlaceGrid from "../../components/places/PlaceGrid";
import {useLocation} from "react-router-dom";
import * as advertisementApi from "../../utils/api/advertisement";

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
        minPrice: null,
        maxPrice: null,
        maxRating: null,
        sortByPrice: {value: 'asc', label: 'Price: Low to High'}
    })
    const [advertisementsData, setAdvertisementsData] = useState({
        advertisementList: []
    })

    useEffect(() => {
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
            loadAllAdvertisements(1)
        }
    }, []);

    const loadAllAdvertisements = async (pageNumber, sortByPrice) => {
        setAdvertisementsData({advertisementList: []})
        const res = await advertisementApi.getFilteredAdvertisements(pageNumber, 5, searchData.keyword, searchData.location, searchData.category, searchData.minPrice, searchData.maxPrice, searchData.maxRating, sortByPrice !== undefined ? sortByPrice : searchData.sortByPrice)
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
        if (name === "sortByPrice") await loadAllAdvertisements(1, data)
    }

    const handleLoadMore = () => {
        if (page < totalPages) {
            loadAllAdvertisements(page + 1);
        }
    }


    return (
        <main className="list-left-sidebar">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="List Left Sidebar" MenuPgTitle="Listings" img={states.breadcrumbimg}/>

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
                                                onApplyFilters={() => loadAllAdvertisements(1)} data={searchData}/>
                        </div>

                        <div className="col-lg-8 row align-items-start">
                            <PlaceGrid advertisementsData={advertisementsData}/>
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
